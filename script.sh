

# CERAMIC_URL=http://localhost:7007 
CERAMIC_URL=https://ceramic-gitcoin-staging.hirenodes.io

echo
echo "Creating did"
composedb did:from-private-key ${PRIVAKE_KEY}

echo
echo "Creating composite"
composedb composite:create gitcoin-passport-vc.graphql --output=gitcoin-passport-vc-composite.json --did-private-key=${PRIVAKE_KEY}

echo
echo "Deploy composite"
composedb composite:deploy gitcoin-passport-vc-composite.json --ceramic-url=${CERAMIC_URL} --did-private-key=${PRIVAKE_KEY} | jq .

echo
echo "List models"
composedb composite:models gitcoin-passport-vc-composite.json | jq .


echo
echo "Compile the composite"
composedb composite:compile gitcoin-passport-vc-composite.json src/__generated__/definition.js --ceramic-url=${CERAMIC_URL}


echo
echo "Compile the composite to json"
composedb composite:compile gitcoin-passport-vc-composite.json gitcoin-passport-vc-runtime.json --ceramic-url=${CERAMIC_URL}
