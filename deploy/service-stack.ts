import { Construct, Duration, Stack, StackProps } from '@aws-cdk/core';
import {
  EcsClusterMain,
  LoadBalancerMain,
  VpcMain,
} from '@bpetryshyn/nails-platform-client';
import {
  ContainerImage,
  Ec2Service,
  Ec2TaskDefinition,
  LogDriver,
  Protocol as EcsProtocol,
  Secret,
} from '@aws-cdk/aws-ecs';
import {
  ApplicationProtocol,
  ApplicationTargetGroup,
  ListenerCondition,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import { IVpc } from '@aws-cdk/aws-ec2';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { StringParameter } from '@aws-cdk/aws-ssm';

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcMain = new VpcMain(this, 'vpc-main');
    const ecsClusterMain = new EcsClusterMain(this, 'ecs-cluster-main');
    const loadBalancerMain = new LoadBalancerMain(this, 'load-balancer-main');

    const taskDefinition = this.createTaskDefinition();

    const service = this.createEcsService(ecsClusterMain, taskDefinition);

    const targetGroup = this.createTargetGroup(vpcMain.vpc, service);

    loadBalancerMain.httpListener.addTargetGroups(
      'nails-service-target-group-attachment',
      {
        conditions: [ListenerCondition.pathPatterns(['/nails*'])],
        priority: 10,
        targetGroups: [targetGroup],
      },
    );
  }

  private createTaskDefinition() {
    const taskDefinition = new Ec2TaskDefinition(
      this,
      'nails-service-task-definition',
    );

    const container = taskDefinition.addContainer('nails-service-container', {
      image: ContainerImage.fromAsset('..'),
      memoryLimitMiB: 256,
      cpu: 256,
      stopTimeout: Duration.seconds(2),
      secrets: {
        MONGO_CONNECTION_STRING: Secret.fromSsmParameter(
          StringParameter.fromStringParameterName(
            this,
            'mongo-connection-string-secret',
            'nails-service-mongo-connection-string',
          ),
        ),
        JWT_SECRET: Secret.fromSsmParameter(
          StringParameter.fromStringParameterName(
            this,
            'jwt-secret',
            'nails-service-jwt-secret',
          ),
        ),
      },
      logging: LogDriver.awsLogs({
        streamPrefix: 'nails-service',
        logRetention: RetentionDays.ONE_WEEK,
      }),
    });

    container.addPortMappings({
      containerPort: 3000,
      protocol: EcsProtocol.TCP,
    });

    return taskDefinition;
  }

  private createEcsService(
    cluster: EcsClusterMain,
    taskDefinition: Ec2TaskDefinition,
  ) {
    return new Ec2Service(this, 'nails-service', {
      cluster: cluster.cluster,
      taskDefinition,
    });
  }

  private createTargetGroup(vpc: IVpc, service: Ec2Service) {
    const targetGroup = new ApplicationTargetGroup(
      this,
      'nails-service-target-group',
      {
        vpc: vpc,
        protocol: ApplicationProtocol.HTTP,
        healthCheck: {
          path: '/nails',
          interval: Duration.seconds(5),
          timeout: Duration.seconds(2),
          healthyThresholdCount: 2,
        },
        deregistrationDelay: Duration.seconds(2),
      },
    );
    targetGroup.addTarget(service);
    return targetGroup;
  }
}
