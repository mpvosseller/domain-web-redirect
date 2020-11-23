import * as acm from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53'
import * as cdk from '@aws-cdk/core'
import { DomainWebRedirect } from 'domain-web-redirect'

export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new DomainWebRedirect(this, 'DomainWebRedirect', {
      sourceDomains: [
        {
          domainName: 'sandbox.mikevosseller.com',
          hostedZone: route53.HostedZone.fromLookup(this, `HostedZone`, {
            domainName: 'sandbox.mikevosseller.com',
          }),
        },
      ],
      certificate: acm.Certificate.fromCertificateArn(
        this,
        'Certificate',
        'arn:aws:acm:us-east-1:855277382201:certificate/e8c5f7e0-4cd9-426a-9a7d-c17f54302bcd'
      ),
      targetDomain: 'www.google.com',
    })
  }
}
