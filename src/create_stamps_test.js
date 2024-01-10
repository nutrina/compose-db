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

for (let i = 0; i < 5; i++) {
  const m = `mutation {
            createPassportVerifiableClaimBinary(input: {
              content: {
                recipient: "did:pkh:eip155:1:0x0${i}"
                controller: "controller tester ${i}"
                binary: "gerald the tester ${i}"
              }
            })
            {
              document {
                id
                recipient
                binary
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

for (let i = 0; i < 5; i++) {
  const m = `mutation {
            createPassportVerifiableClaimProbabilistic(input: {
              content: {
                recipient: "did:pkh:eip155:1:0x0${i}"
                controller: "controller tester ${i}"
                probability: "probability ${i}"
              }
            })
            {
              document {
                id
                recipient
                probability
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

console.log("DONE");

const m = `
  query MyQuery {
    verifiableClaimIndex(first: 100) {
      edges {
        node {
          controller
          recipient
          ... on PassportVerifiableClaimBinary {
            id
          }
        }
      }
    }
  }
`;

console.log("Executing query now");
const data = await compose.executeQuery(m);

console.log("Query result:", data);
console.log("Query result:", data.data);

console.log("Query result:", data.data.verifiableClaimIndex);
console.log("Query result:", data.data.verifiableClaimIndex.edges);
data.data.verifiableClaimIndex.edges.forEach((record) => {
  console.log("record:", record);
});

console.log("DONE");
