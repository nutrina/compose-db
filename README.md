# Testing composedb

- start the ceramic node: `npx @ceramicnetwork/cli daemon`
- set the env variable: `export PRIVAKE_KEY=your_private_key`
- run: `./script.sh`
- run: `./run_graphql.sh` or `composedb graphql:server --ceramic-url=http://127.0.0.1:7007 --graphiql gitcoin-passport-vc-composite.json --did-private-key=${PRIVAKE_KEY} --port=5005`

