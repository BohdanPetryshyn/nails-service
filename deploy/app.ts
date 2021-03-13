#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NailsServiceStack } from './nails-service-stack';

const app = new cdk.App();
new NailsServiceStack(app, 'nails-service-stack', {
  env: {
    account: '596647861466',
    region: 'eu-central-1',
  },
});
