import { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { readFileSync } from "fs";
import { fromString } from "uint8arrays/from-string";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { definition } from "./__generated__/definition.js";

const CERAMIC_URL = "http://localhost:7007";
// const seed = "b9ff51d1498c20f4555a1558395e76e572baa4c2e774f57aaa7b585ad3b3265b";
const seed = "a9ff51d1498c20f4555a1558395e76e572baa4c2e774f57aaa7b585ad3b3265b";

export const compose = new ComposeClient({
  ceramic: CERAMIC_URL,
  definition,
});

const ceramic = new CeramicClient(CERAMIC_URL);
const authenticate = async () => {
  const key = fromString(seed, "base16");
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key),
  });
  await did.authenticate();
  ceramic.did = did;
  return did;
};

const did = await authenticate();

console.log("============================================");
console.log(did);
console.log("============================================");

compose.setDID(did);

console.log("Authenticated and set did in compose client");

for (let i = 0; i < 2; i++) {
  const m = `mutation {
            createGitcoinPassportStamp(input: {
              content: {
                _context: ["hello context"]
                issuer: "gerald the tester ${i}"
                issuanceDate: "2023-10-06T11:38:27.102Z"
                expirationDate: "2024-10-06T11:38:27.102Z"
                type: ["VerifiableCredential", "GitcoinPassportStamp"]
                
                credentialSubject: {
                  _id: "credentialSubject ${i}"
                  provider: "provider ${i}"
                  hash: "this_is_hash_${i}"

                  _context: {
                    hash: "https://schema.org/Text"
                    provider: "https://schema.org/Text"
                  }
                }

                proof: {   
                  _context: "https://w3id.org/security/suites/eip712sig-2021/v1"
                  type: "EthereumEip712Signature2021"
                  proofPurpose: "assertionMethod"
                  proofValue: "0x9f295b82d0262607a97e14d978e57ca45734ca4d3e9c0a8e215a9d535d73b18d4a8c828154a6ceb25bf2bc79d57bb144ac1ce9096ff7e39660cd275ed13cf6ce1b"
                  verificationMethod: "did:ethr:0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e#controller"
                  created: "2023-09-11T12:31:45.103Z"

                  eip712Domain: {
                    domain: { name: "VerifiableCredential" }
                    primaryType: "Document"
                    types: {
                      Context: [
                        { name: "customInfo", type: "string" }
                        { name: "hash", type: "string" }
                        { name: "metaPointer", type: "string" }
                        { name: "provider", type: "string" }
                      ],
                      CredentialStatus: [
                        { name: "id", type: "string" }
                        { name: "type", type: "string" }
                        { name: "statusPurpose", type: "string" }
                        { name: "statusListIndex", type: "string" }
                        { name: "statusListCredential", type: "string" }
                      ],
                      CredentialSubject: [
                        { name: "id", type: "string" }
                        { name: "provider", type: "string" }
                        { name: "metaPointer", type: "string" }
                        { name: "customInfo", type: "CustomInfo" }
                        { name: "hash", type: "string" }
                        { name: "@context", type: "Context[]" }
                      ],
                      Document: [
                        { name: "@context", type: "string[]" }
                        { name: "type", type: "string[]" }
                        { name: "issuer", type: "string" }
                        { name: "issuanceDate", type: "string" }
                        { name: "expirationDate", type: "string" }
                        { name: "credentialSubject", type: "CredentialSubject" }
                        { name: "proof", type: "Proof" }
                        { name: "credentialStatus", type: "CredentialStatus" }
                      ],
                      EIP712Domain: [{ name: "name", type: "string" }],
                      Proof: [
                        { name: "@context", type: "string" }
                        { name: "type", type: "string" }
                        { name: "proofPurpose", type: "string" }
                        { name: "proofValue", type: "string" }
                        { name: "verificationMethod", type: "string" }
                        { name: "created", type: "string" }
                      ]
                    }
                  }
                }
              }
            })
            {
              document {
                id
                type
                issuer
                issuanceDate
                expirationDate
             }
           }
          }
           `;

  console.log("Executing query now");
  const data = await compose.executeQuery(m);

  console.log("Query result:", data);
  console.log("Query result:", data.data);
  console.log("Query result:", data.data.createGitcoinPassportStamp);

  const vc_id = data.data.createGitcoinPassportStamp.document.id;
  console.log("Creating wrapper for:", vc_id);

  const createWrapper = `mutation {
    createGitcoinPassportStampWrapper(
      input: {content: {vcID: "${vc_id}", isDeleted: false, isRevoked: false}}
    ) {
      clientMutationId
      document {
        id
        isDeleted
        isRevoked
        vc {
          expirationDate
          issuanceDate
          issuer
        }
      }
    }
  }
   `;

  const wrapperData = await compose.executeQuery(createWrapper);
  console.log("Query result:", wrapperData);
  console.log("Query result:", wrapperData.data);
  console.log(
    "Query result:",
    wrapperData.data.createGitcoinPassportStampWrapper
  );
}

for (let i = 0; i < 2; i++) {
  const m = `mutation {
            createGitcoinPassportProbabilisticStamp(input: {
              content: {
                _context: ["hello context"]
                issuer: "gerald the tester ${i}"
                issuanceDate: "2023-10-06T11:38:27.102Z"
                expirationDate: "2024-10-06T11:38:27.102Z"
                type: ["VerifiableCredential", "GitcoinPassportProbabilisticStamp"]
                
                credentialSubject: {
                  _id: "credentialSubject ${i}"
                  provider: "provider ${i}"
                  hash: "this_is_hash_${i}"
                  probability: ${i}

                  _context: {
                    hash: "https://schema.org/Text"
                    provider: "https://schema.org/Text"
                    probability: "https://schema.org/Number"
                  }
                }

                proof: {   
                  _context: "https://w3id.org/security/suites/eip712sig-2021/v1"
                  type: "EthereumEip712Signature2021"
                  proofPurpose: "assertionMethod"
                  proofValue: "0x9f295b82d0262607a97e14d978e57ca45734ca4d3e9c0a8e215a9d535d73b18d4a8c828154a6ceb25bf2bc79d57bb144ac1ce9096ff7e39660cd275ed13cf6ce1b"
                  verificationMethod: "did:ethr:0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e#controller"
                  created: "2023-09-11T12:31:45.103Z"

                  eip712Domain: {
                    domain: { name: "VerifiableCredential" }
                    primaryType: "Document"
                    types: {
                      Context: [
                        { name: "customInfo", type: "string" }
                        { name: "hash", type: "string" }
                        { name: "metaPointer", type: "string" }
                        { name: "provider", type: "string" }
                      ],
                      CredentialStatus: [
                        { name: "id", type: "string" }
                        { name: "type", type: "string" }
                        { name: "statusPurpose", type: "string" }
                        { name: "statusListIndex", type: "string" }
                        { name: "statusListCredential", type: "string" }
                      ],
                      CredentialSubject: [
                        { name: "id", type: "string" }
                        { name: "provider", type: "string" }
                        { name: "metaPointer", type: "string" }
                        { name: "customInfo", type: "CustomInfo" }
                        { name: "hash", type: "string" }
                        { name: "@context", type: "Context[]" }
                      ],
                      Document: [
                        { name: "@context", type: "string[]" }
                        { name: "type", type: "string[]" }
                        { name: "issuer", type: "string" }
                        { name: "issuanceDate", type: "string" }
                        { name: "expirationDate", type: "string" }
                        { name: "credentialSubject", type: "CredentialSubject" }
                        { name: "proof", type: "Proof" }
                        { name: "credentialStatus", type: "CredentialStatus" }
                      ],
                      EIP712Domain: [{ name: "name", type: "string" }],
                      Proof: [
                        { name: "@context", type: "string" }
                        { name: "type", type: "string" }
                        { name: "proofPurpose", type: "string" }
                        { name: "proofValue", type: "string" }
                        { name: "verificationMethod", type: "string" }
                        { name: "created", type: "string" }
                      ]
                    }
                  }
                }
              }
            })
            {
              document {
                id
                type
                issuer
                issuanceDate
                expirationDate
             }
           }
          }
           `;

  console.log("Executing query now");
  const data = await compose.executeQuery(m);

  console.log("Query result:", data);
  console.log("Query result:", data.data);
  console.log(
    "Query result:",
    data.data.createGitcoinPassportProbabilisticStamp
  );

  const vc_id = data.data.createGitcoinPassportProbabilisticStamp.document.id;
  console.log("Creating wrapper for:", vc_id);

  const createWrapper = `mutation {
    createGitcoinPassportStampWrapper(
      input: {content: {vcID: "${vc_id}", isDeleted: false, isRevoked: false}}
    ) {
      clientMutationId
      document {
        id
        isDeleted
        isRevoked
        vc {
          type
          expirationDate
          issuanceDate
          issuer
        }
      }
    }
  }
   `;

  const wrapperData = await compose.executeQuery(createWrapper);
  console.log("Query result:", wrapperData);
  console.log("Query result:", wrapperData.data);
  console.log(
    "Query result:",
    wrapperData.data.createGitcoinPassportStampWrapper
  );
}

console.log("DONE");
