# Merge-Freeze CircleCI Build Pipeline

This is the main build pipeline for the merge-freeze-github-app repo. On each commit to master the pipeline will build and deploy the app to namespace.

![diagram of circleci pipeline](pipeline.png)

## Orbs
Here is the list of orbs that we are currently using:

[aws-eks: circleci/aws-eks@0.2.3](https://circleci.com/orbs/registry/orb/circleci/aws-eks)<br />
[aws-cli: circleci/aws-cli@0.1.18](https://circleci.com/orbs/registry/orb/circleci/aws-cli)<br />
[aws-ecr: circleci/aws-ecr@6.5.0](https://circleci.com/orbs/registry/orb/circleci/aws-ecr?version=6.5.0)
[version-tag: commitdev/version-tag@0.0.3](https://circleci.com/orbs/registry/orb/commitdev/version-tag)<br />
[kubernetes: circleci/kubernetes@0.11.0](https://circleci.com/orbs/registry/orb/circleci/kubernetes)<br />

### Build and Push
This step creates the image that will be deployed to Kubernetes and then pushes it to ECR in the merge-freeze repo for Kubernetes to be able to deploy. 

### Production Deployment
This step requires the `build_and_push` job to be succesfully completed before running. This step uses the [aws-eks orb](https://circleci.com/orbs/registry/orb/circleci/aws-eks) to access our EKS cluster on production. The hosted app would then be updated and ready for use in Slack.