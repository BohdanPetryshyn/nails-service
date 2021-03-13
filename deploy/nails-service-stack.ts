import * as cdk from '@aws-cdk/core';
import {
  EcsClusterMain,
  LoadBalancerMain,
  VpcMain,
} from '@bpetryshyn/nails-platform-client';
import {
  ContainerImage,
  Ec2Service,
  Ec2TaskDefinition,
  Protocol as EcsProtocol,
} from '@aws-cdk/aws-ecs';
import {
  ApplicationProtocol,
  ApplicationTargetGroup,
  ListenerCondition,
} from '@aws-cdk/aws-elasticloadbalancingv2';

export class NailsServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcMain = new VpcMain(this, 'vpc-main');
    const ecsClusterMain = new EcsClusterMain(this, 'ecs-cluster-main');
    const loadBalancerMain = new LoadBalancerMain(this, 'load-balancer-main');

    const taskDefinition = new Ec2TaskDefinition(
      this,
      'nails-service-task-definition',
    );
    const container = taskDefinition.addContainer('nails-service-container', {
      image: ContainerImage.fromAsset('..'),
      memoryLimitMiB: 256,
      cpu: 256,
    });
    container.addPortMappings({
      containerPort: 3000,
      protocol: EcsProtocol.TCP,
    });

    const service = new Ec2Service(this, 'nails-service', {
      cluster: ecsClusterMain.cluster,
      taskDefinition,
    });

    const targetGroup = new ApplicationTargetGroup(
      this,
      'nails-service-target-group',
      {
        vpc: vpcMain.vpc,
        protocol: ApplicationProtocol.HTTP,
      },
    );
    targetGroup.addTarget(service);

    loadBalancerMain.httpListener.addTargetGroups(
      'nails-service-target-group-attachment',
      {
        conditions: [ListenerCondition.pathPatterns(['/nails*'])],
        priority: 10,
        targetGroups: [targetGroup],
      },
    );
  }
}
