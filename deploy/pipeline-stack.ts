import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { GitHubSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { AppStage } from './app-stage';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    const pipeline = new CdkPipeline(this, 'nails-service-pipeline', {
      pipelineName: 'nails-service',
      cloudAssemblyArtifact,
      crossAccountKeys: false,

      sourceAction: new GitHubSourceAction({
        actionName: 'GitHub',
        owner: 'BohdanPetryshyn',
        oauthToken: SecretValue.secretsManager('BohdanPetryshynGitHubToken'),
        repo: 'nails-service',
        branch: 'main',
        output: sourceArtifact,
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        subdirectory: 'deploy',
        sourceArtifact,
        cloudAssemblyArtifact,
      }),
    });

    pipeline.addApplicationStage(
      new AppStage(this, 'nails-app-stage', {
        env: {
          account: '702862237886',
          region: 'eu-central-1',
        },
      }),
    );
  }
}
