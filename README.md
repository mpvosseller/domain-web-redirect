# domain-web-redirect

An AWS CDK construct that redirects all http/https requests for one domain to another.
This could be used to redirect from the `www` domain (e.g. `www.example.com`) to the
APEX / naked domain (e.g. `example.com`) or vice versa.

`DomainWebRedirect` is an [AWS CDK](https://aws.amazon.com/cdk) construct that redirects
web requests for one or more `source` domains to a `target` domain. You must provide a
reference to a certificate that works for all of the `source` domains.

Note that this uses 301 permanent redirects which browsers cache without an expiration
date. This means that if you want to change where you redirect to you should configure
the old `target` domain to redirect to the new `target` domain.

## Installation

```
npm install domain-web-redirect

# install any peer dependencies not already installed
npm install @aws-cdk/aws-certificatemanager @aws-cdk/aws-cloudfront @aws-cdk/aws-iam @aws-cdk/aws-lambda @aws-cdk/aws-route53 @aws-cdk/aws-route53-targets @aws-cdk/core
```

## Usage

```typescript
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53'
import { DomainWebRedirect } from 'domain-web-redirect'

// redirect requests for http://source.example.com and https://source.example.com to https://target.example.com
new DomainWebRedirect(this, 'DomainWebRedirect', {
  sourceDomains: [
    {
      domainName: 'source.example.com',
      hostedZone: route53.HostedZone.fromLookup(this, `HostedZone`, {
        domainName: 'example.com',
      }),
    },
  ],
  certificate: acm.Certificate.fromCertificateArn(
    this,
    'Certificate',
    'arn:aws:acm:region:account:certificate/123456789012-1234-1234-1234-12345678'
  ),
  targetDomain: 'target.example.com',
})
```
