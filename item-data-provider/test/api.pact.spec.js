const { Verifier } = require("@pact-foundation/pact");
const { skywalker } = require('../src/common')

const express = require('express');
const app = new express();

app.use('/api', [express.json()]);
app.use(`/api/v${skywalker}/items`, require('../src/items/provider'))

const PORT = 8080;
const server = app.listen(`${PORT}`);
const { load, clear, data } = require('../src/data');

describe('API - Contract Testing', () => {
    it(`validate the expectations for consumers versions`, () => {
        let opts = {
            provider: "app-item-data",
            logLevel: "INFO",
            providerBaseUrl: `http://localhost:${PORT}`,
            stateHandlers: {
                'an item is found using existent label': () => {
                    clear();
                    load();
                    data.push({
                        id: 0,
                        label: 'water',
                        description: "Sparkling water is refreshing",
                        price: 30,
                        image: {
                            small: "url to small file",
                            medium: "url to medium file",
                            large: "url to large file",
                            huge: "url to huge file"
                        }
                    });
                },
                'an item isn\'t found using unexistent label': () => {
                    clear();
                }
            },
            pactBrokerUrl: "http://localhost:9292",
            providerVersion: skywalker,
            consumerVersionTag: [],
            providerVersionTag: [],
            enablePending: true,
            publishVerificationResult: true,
        };

        return new Verifier(opts).verifyProvider()
            .then(output => {
                console.log("Pact Verification Complete!");
                console.log(output);
            })
            .finally(() => {
                server.close();
            });
    });
});