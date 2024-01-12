
echo
echo "Creating did"
npx composedb did:from-private-key ${PRIVAKE_KEY}

echo
echo "Creating composite"
npx composedb composite:create gitcoin-passport-vc.graphql --output=gitcoin-passport-vc-composite.json --did-private-key=${PRIVAKE_KEY}

echo
echo "Deploy composite"
npx composedb composite:deploy gitcoin-passport-vc-composite.json --ceramic-url=${CERAMIC_URL} --did-private-key=${PRIVAKE_KEY} | jq .

echo
echo "List models"
npx composedb composite:models gitcoin-passport-vc-composite.json | jq .


echo
echo "Compile the composite"
npx composedb composite:compile gitcoin-passport-vc-composite.json src/__generated__/definition.js --ceramic-url=${CERAMIC_URL}


echo
echo "Compile the composite to json"
npx composedb composite:compile gitcoin-passport-vc-composite.json gitcoin-passport-vc-runtime.json --ceramic-url=${CERAMIC_URL}
