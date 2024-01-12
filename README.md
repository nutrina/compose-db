# Intro

Please find an overview [here](https://app.diagrams.net/#Hnutrina%2Fcompose-db%2Fmain%2FOverview.drawio)

# Getting started

- prerequisites: node v.20
- installation: `yarn install`

## One time only

- generate a private key if you have not already: `composedb did:generate-private-key`
- make sure to add the `did` coresponding to the private key to the allowed admins in the ceramic node
  - to get the did for a particular key, run: `composedb did:from-private-key`
  - add the did to the list of `admin-dids` in `~/.ceramic/daemon.config.json` on your local (or on the node which your are testing with)

## Deploying the models

- start ceramic node in one terminal: `CERAMIC_ENABLE_EXPERIMENTAL_COMPOSE_DB=true npx @ceramicnetwork/cli daemon`
- set the env variables for private key and ceramic node:

```bash
export PRIVAKE_KEY=your_private_key
export CERAMIC_URL=http://localhost:7007
```

- run: `./script.sh` to build and deploy the models
- run graphql client: `./run_graphql.sh` or `composedb graphql:server --ceramic-url=http://127.0.0.1:7007 --graphiql gitcoin-passport-vc-composite.json --did-private-key=${PRIVAKE_KEY} --port=5005`

# Example query:

Please find other queries in the `./src/` folder.

## For the VC

```graphql
query MyQuery {
  gitcoinPassportStampWrapperIndex(first: 100) {
    edges {
      node {
        id
        isDeleted
        isRevoked
        vc {
          issuer
          type
          expirationDate
          issuanceDate
          ... on GitcoinPassportStamp {
            id
            credentialSubject {
              _id
              hash
              provider
            }
            proof {
              ...GitcoinPassportVcProofFragment
            }
          }
          ... on GitcoinPassportProbabilisticStamp {
            id
            credentialSubject {
              _id
              hash
              provider
            }
            proof {
              ...GitcoinPassportVcProofFragment
            }
          }
        }
      }
    }
  }
}

fragment GitcoinPassportVcProofFragment on GitcoinPassportVcProof {
  proofPurpose
  _context
  created
  proofPurpose
  proofValue
  type
  verificationMethod
  eip712Domain {
    primaryType
    domain {
      name
    }
    types {
      Context {
        name
        type
      }
      CredentialStatus {
        name
        type
      }
      CredentialSubject {
        name
        type
      }
      Document {
        name
        type
      }
      EIP712Domain {
        name
        type
      }
      Proof {
        name
        type
      }
    }
  }
}
```

## Mark as deleted ...

```graphql
mutation MyMutation {
  updateGitcoinPassportStampWrapper(
    input: {
      content: { isDeleted: true }
      id: "kjzl6kcym7w8y74fzl6mvv7qe12pte1utqri3tt234xaig3wkv35b6pkqz9vsuw"
    }
  ) {
    document {
      id
      isDeleted
      isRevoked
      vcID
    }
  }
}
```
