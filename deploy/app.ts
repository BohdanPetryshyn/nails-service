#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from './pipeline-stack';

const app = new cdk.App();
new PipelineStack(app, 'nails-service-pipeline', {
  env: {
    account: '596647861466',
    region: 'eu-central-1',
  },
});
