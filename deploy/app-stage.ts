import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { ServiceStack } from './service-stack';

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    new ServiceStack(this, 'nails-service-stack');
  }
}
