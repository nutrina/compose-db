# Testing composedb

- install compose: https://composedb.js.org/docs/0.5.x/set-up-your-environment#installation-using-javascript-package-managers
  - minimum `@composedb/cli/` version: `0.3.1`
- generate a private key if you have not already: `composedb did:generate-private-key`
- set the env variables for private key and ceramic node:
```bash
export PRIVAKE_KEY=your_private_key
export CERAMIC_URL=http://localhost:7007
```
- make sure to add the did coresponding to the private key to the allowed admins in the ceramic node
  - to get the did for a particular key, run: `composedb did:from-private-key`
  - add the did to the list of `admin-dids` in `~/.ceramic/daemon.config.json` on your local (or on the node which your are testing with)
- start the ceramic node: `npx @ceramicnetwork/cli daemon`
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