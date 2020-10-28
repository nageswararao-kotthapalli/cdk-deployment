"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const apigw = require("@aws-cdk/aws-apigateway");
class CdkServerlessGetStartedStack extends cdk.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        //Dynamodb table definition
        const table = new dynamodb.Table(this, "Hello", {
            partitionKey: { name: "name", type: dynamodb.AttributeType.STRING },
        });
        // lambda function
        const dynamoLambda = new lambda.Function(this, "DynamoLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset("functions"),
            handler: "function.handler",
            environment: {
                HELLO_TABLE_NAME: table.tableName,
            },
        });
        // permissions to lambda to dynamo table
        table.grantReadWriteData(dynamoLambda);
        // create the API Gateway with one method and path
        const api = new apigw.RestApi(this, "hello-api");
        api.root
            .resourceForPath("hello")
            .addMethod("GET", new apigw.LambdaIntegration(dynamoLambda));
        new cdk.CfnOutput(this, "HTTP API URL", {
            value: (_a = api.url, (_a !== null && _a !== void 0 ? _a : "Something went wrong with the deploy")),
        });
    }
}
exports.CdkServerlessGetStartedStack = CdkServerlessGetStartedStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXNlcnZlcmxlc3MtZ2V0LXN0YXJ0ZWQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstc2VydmVybGVzcy1nZXQtc3RhcnRlZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyw4Q0FBOEM7QUFDOUMsa0RBQWtEO0FBQ2xELGlEQUFpRDtBQUVqRCxNQUFhLDRCQUE2QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3pELFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjs7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsMkJBQTJCO1FBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzlDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3BFLENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ3BFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFdBQVcsRUFBRTtnQkFDWCxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNsQztTQUNGLENBQUMsQ0FBQztRQUVILHdDQUF3QztRQUN4QyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsa0RBQWtEO1FBQ2xELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFakQsR0FBRyxDQUFDLElBQUk7YUFDTCxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQ3hCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUUvRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0QyxLQUFLLFFBQUUsR0FBRyxDQUFDLEdBQUcsdUNBQUksc0NBQXNDLEVBQUE7U0FDekQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakNELG9FQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSBcIkBhd3MtY2RrL2F3cy1keW5hbW9kYlwiO1xyXG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDZGtTZXJ2ZXJsZXNzR2V0U3RhcnRlZFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgLy9EeW5hbW9kYiB0YWJsZSBkZWZpbml0aW9uXHJcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCBcIkhlbGxvXCIsIHtcclxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwibmFtZVwiLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbGFtYmRhIGZ1bmN0aW9uXHJcbiAgICBjb25zdCBkeW5hbW9MYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiRHluYW1vTGFtYmRhSGFuZGxlclwiLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5hc3NldChcImZ1bmN0aW9uc1wiKSxcclxuICAgICAgaGFuZGxlcjogXCJmdW5jdGlvbi5oYW5kbGVyXCIsXHJcbiAgICAgIGVudmlyb25tZW50OiB7XHJcbiAgICAgICAgSEVMTE9fVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcGVybWlzc2lvbnMgdG8gbGFtYmRhIHRvIGR5bmFtbyB0YWJsZVxyXG4gICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKGR5bmFtb0xhbWJkYSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBBUEkgR2F0ZXdheSB3aXRoIG9uZSBtZXRob2QgYW5kIHBhdGhcclxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsIFwiaGVsbG8tYXBpXCIpO1xyXG5cclxuICAgIGFwaS5yb290XHJcbiAgICAgIC5yZXNvdXJjZUZvclBhdGgoXCJoZWxsb1wiKVxyXG4gICAgICAuYWRkTWV0aG9kKFwiR0VUXCIsIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihkeW5hbW9MYW1iZGEpKTtcclxuXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkhUVFAgQVBJIFVSTFwiLCB7XHJcbiAgICAgIHZhbHVlOiBhcGkudXJsID8/IFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgZGVwbG95XCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19