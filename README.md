# PACT Testing example

This is an example of PACT testing using:
- nodejs
- pact-foundation/pact
- axios
- chai
- express
- loadsh
- mocha
- docker

For the following steps, please use `${root}` value as current folder.  

## Deploy PACT Broker on Docker

Please, go to `${root}` folder and use the folllowing command:
```
docker-compose up -d
```

Make sure you have:
- create a folder called `node_modules` on `${root}`.
- symbolic links `ln -s` of `node_modules` on each consumer/provider project.

Or change `docker-compose.yaml` volumes configuration to have their own folder.

## Publish PACT to Broker

Please, go to `${root}/notify-client-consumer` and `${root}/customer-purchase-consumer` folders and use the following command:
```
npm run test && npm run publish
```

Access the url http://localhost:9292 to view published PACTs.

## Validating PACT on Broker

Please, go to `${root}/client-data-provider` and `${root}/item-data-provider` folders and use the following command:
```
npm run test
```

Access the url http://localhost:9292 to view validated PACTs.