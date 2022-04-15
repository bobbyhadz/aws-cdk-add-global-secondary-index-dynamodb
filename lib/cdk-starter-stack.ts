import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create Dynamodb table
    const table = new dynamodb.Table(this, id, {
      partitionKey: {name: 'todoId', type: dynamodb.AttributeType.STRING},
      sortKey: {name: 'createdAt', type: dynamodb.AttributeType.NUMBER},
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 👇 add global secondary index
    table.addGlobalSecondaryIndex({
      indexName: 'userIdIndex',
      partitionKey: {name: 'userId', type: dynamodb.AttributeType.STRING},
      sortKey: {name: 'status', type: dynamodb.AttributeType.STRING},
      readCapacity: 1,
      writeCapacity: 1,
      projectionType: dynamodb.ProjectionType.ALL,
    });
  }
}
