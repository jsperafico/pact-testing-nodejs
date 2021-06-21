# PACT Testing example

This is an example of PACT testing using:
- nodejs
- pact-foundation/pact
- axios
- chai
- express
- mocha
- docker

For the following steps, please use `${root}` value as current folder.  

## Deploy PACT Broker on Docker

Please, go to `${root}` folder and use the folllowing command:
```
docker-compose up -d
```

## Publish PACT to Broker

Please, go to `${root}/notify-client-consumer` folder and use the following command:
```
npm run test && npm run publish
```

Access the url http://localhost:9292 to view published PACTs.