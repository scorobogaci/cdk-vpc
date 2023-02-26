import * as cdk from 'aws-cdk-lib';
import {CfnDeletionPolicy, RemovalPolicy} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class AppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const sampleVpc = new ec2.Vpc(this, 'SampleVirtualCloud', {
            vpcName: 'SampleVpc',
            natGateways: 1,
            subnetConfiguration: [
                {
                    name: 'private-subnet-1',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24,
                },
                {
                    name: 'app-public-subnet-1',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
                {
                    name: 'isolated-subnet-1',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                    cidrMask: 28,
                },
            ],
        });


        for (const subnet of sampleVpc.selectSubnets({subnetType:ec2.SubnetType.PUBLIC}).subnets) {
            // Have tried to use this construct to delete de resource on update, did not work
            subnet.applyRemovalPolicy(RemovalPolicy.DESTROY)

            // Have tried this one as well, not working, still CIDR overlap, meaning the subnet is still retained
            const subnetResource = subnet.node.defaultChild as cdk.CfnResource;
            subnetResource.cfnOptions.updateReplacePolicy = CfnDeletionPolicy.DELETE
            subnetResource.cfnOptions.deletionPolicy = CfnDeletionPolicy.DELETE
        }
    }

}
