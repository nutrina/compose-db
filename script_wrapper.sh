


echo
echo "Creating composite"
composedb composite:create gitcoin-passport-vc-wrapper.graphql --output=gitcoin-passport-vc-wrapper-composite.json --did-private-key=${PRIVAKE_KEY}

echo
echo "Deploy composite"
composedb composite:deploy gitcoin-passport-vc-wrapper-composite.json --ceramic-url=${CERAMIC_URL} --did-private-key=${PRIVAKE_KEY} | jq .

echo
echo "List models"
composedb composite:models gitcoin-passport-vc-wrapper-composite.json | jq .


echo
echo "Compile the composite"
composedb composite:compile gitcoin-passport-vc-wrapper-composite.json src/__generated__/definition_wrapper.js --ceramic-url=${CERAMIC_URL}


echo
echo "Compile the composite to json"
composedb composite:compile gitcoin-passport-vc-wrapper-composite.json gitcoin-passport-vc-wrapper-runtime.json --ceramic-url=${CERAMIC_URL}
