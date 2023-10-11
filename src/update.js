import { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { readFileSync } from "fs";
import { fromString } from "uint8arrays/from-string";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { definition } from "./__generated__/definition.js";

const CERAMIC_URL = "http://localhost:7007";
const seed = "b9ff51d1498c20f4555a1558395e76e572bee4c2e774f57dbd7b585ad3b3265b";
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

compose.setDID(did);

console.log("Authenticated and set did in compose client");

const existing_ids = [
  "kjzl6kcym7w8y6nxdhyfuxolqh16c4w6jv7qc7q2zttchbviu8h0d2wg3g64tyv",
  "kjzl6kcym7w8y6nxdhyfuxolqh16c4w6jv7qc7q2zttchbviu8h0d2wg3g64tyv",
  "kjzl6kcym7w8y66d9z61x1hrszuyjal9ubwcdxltxozq9gp9x4s8eeqct1lbw5h",
];
for (let i = 0; i < existing_ids.length; i++) {
  const m = `mutation {
            updateGitcoinPassportStamp(input: {
              id: "${existing_ids[i]}"
              content: {
                issuer: "UPDATED gerald the tester ${i}"
                issuanceDate: "2023-10-06T11:38:27.102Z"
                expirationDate: "2024-10-06T11:38:27.102Z"
                type: ["VerifiableCredential"]
                
                credentialSubject: {
                  _id: "credentialSubject ${i}"
                  provider: "provider ${i}"
                  metaPointer: "http://passport.gitcoin.co/provider_${i}"
                  hash: "this_is_hash_${i}"

                  _context: {
                    hash: "https://schema.org/Text"
                    metaPointer: "https://schema.org/URL"
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
}
// const m = `mutation {
//   createGitcoinPassportStamp(input: {
//     content: {
//       issuer: "gerald the tester"
//       issuanceDate: "2023-10-06T11:38:27.102Z"
//       expirationDate: "2024-10-06T11:38:27.102Z"
//       type: ["VerifiableCredential"]
//     }
//   })
//   {
//     document {
//       id
//       type
//       issuer
//       issuanceDate
//       expirationDate
//    }
//  }
// }
//  `;

console.log("DONE");
