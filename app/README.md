# Check sample template

This is a sample project in CDK which creates a VPC with 3 different types of subnets.
If you have multiple aws profiles set up on your machine, please specify the profile to be used when deploying the template.
`--profile [profile-name]`

This stack creates a VPC with 3 types of subnets : 
* `PRIVATE_WITH_EGRESS`
* `PUBLIC`
* `PRIVATE_ISOLATED`

## Useful commands
* `npm run build`   build the project
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk deploy`      deploy this stack to your default AWS account/region