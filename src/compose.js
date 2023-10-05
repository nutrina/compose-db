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

const m = `mutation {
            createGitcoinPassportStamp(input: {
              content: {
                _id: "did:pkh:eip155:1:0x52905A5E83A83F6a9d0e64Ad24e79a37512D35B9"
               provider: "Brightid"
               hash: "v0.0.0:s0jEKaXBJdfkziP2DDGVFPYcy+nIe6hS9yo3n1pIhRw="
              }
            })
            {
              document {
                id
                _id
                provider
                hash
             }
           }
          }
           `;

console.log("Executing query now");
const data = await compose.executeQuery(m);

console.log("Query result:", data);
console.log("Query result:", data.data);
console.log("Query result:", data.data.createGitcoinPassportStamp);

const m = `mutation {
  createGitcoinPassportStamp(input: {
    content: {
      _id: "did:pkh:eip155:1:0x52905A5E83A83F6a9d0e64Ad24e79a37512D35B9"
     provider: "Brightid"
     hash: "v0.0.0:s0jEKaXBJdfkziP2DDGVFPYcy+nIe6hS9yo3n1pIhRw="
    }
  })
  {
    document {
      id
      _id
      provider
      hash
   }
 }
}
 `;
 
console.log("DONE");
