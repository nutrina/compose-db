# Testing composedb

- start the ceramic node: `npx @ceramicnetwork/cli daemon`
- set the env variable: `export PRIVAKE_KEY=your_private_key`
- run: `./script.sh`
- run: `./run_graphql.sh` or `composedb graphql:server --ceramic-url=http://127.0.0.1:7007 --graphiql gitcoin-passport-vc-composite.json --did-private-key=${PRIVAKE_KEY} --port=5005`


# Example query:
```graphql
query MyQuery {
  gitcoinPassportStampIndex(
    last: 10
    filters: {where: {issuer: {equalTo: "gerald the tester 10"}}}
  ) {
    edges {
      node {
        credentialSubject {
          _id
          hash
          metaPointer
          provider
        }
        proof {
          ...GitcoinPassportStampGitcoinPassportVcProofFragment
        }
        expirationDate
        id
        issuanceDate
        issuer
      }
    }
  }
}

fragment GitcoinPassportStampGitcoinPassportVcProofFragment on GitcoinPassportStampGitcoinPassportVcProof {
  eip712Domain {
    primaryType
    types {
      Context {
        name
        type
      }
      CredentialStatus {
        name
        type
      }
      Proof {
        type
        name
      }
      EIP712Domain {
        name
        type
      }
      Document {
        name
        type
      }
      CredentialSubject {
        name
        type
      }
    }
    domain {
      name
    }
  }
  created
  proofPurpose
  proofValue
  type
  verificationMethod
  _context
}
```