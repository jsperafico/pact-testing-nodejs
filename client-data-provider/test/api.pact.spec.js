const { Verifier } = require("@pact-foundation/pact");
const minion = require('md5')('minion');

const express = require('express');
const app = new express();
app.use('/api', [require('../src/middleware'), express.json()]);
app.use(`/api/v${minion}/clients/`,
    require('../src/client/provider'));

const PORT = 8080;
const server = app.listen(`${PORT}`);
let data = require('../src/data');

describe('API - Contract Testing', () => {
    it(`validates the expectations for version '${minion}' of consumers`, () => {
        const baseOpts = {
            logLevel: "INFO",
            providerBaseUrl: `http://localhost:${PORT}`,
            providerVersion: process.env.TRAVIS_COMMIT ? process.env.TRAVIS_COMMIT : minion,
            providerVersionTags: process.env.TRAVIS_BRANCH ? [process.env.TRAVIS_BRANCH] : [],
            verbose: process.env.VERBOSE === 'true'
        };

        const pactChangedOpts = {
            pactUrls: [process.env.PACT_URL]
        }

        const fetchPactsDynamicallyOpts = {
            provider: "app-client-data",
            // consumerVersionSelectors: [{ tag: 'master', latest: true }, { tag: 'prod', latest: true }],
            pactBrokerUrl: process.env.PACT_BROKER_BASE_URL ? process.env.PACT_BROKER_BASE_URL : "http://localhost:9292",
            enablePending: false,
            includeWipPactsSince: undefined
        }

        const stateHandlers = {
            "client exists": () => {
                data = new Map([
                    ["edina", {
                        "name": "Medina, Jena",
                        "email": "maybe@some.com",
                        "phone": "1000"
                    }]
                ]);
            },

            "client don't exists": () => {
                data = new Map();
            }
            // "products exists": () => {
            //     controller.repository.products = new Map([
            //         ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
            //     ]);
            // },
            // "products exist": () => {
            //     controller.repository.products = new Map([
            //         ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
            //     ]);
            // },
            // "a product with ID 10 exists": () => {
            //     controller.repository.products = new Map([
            //         ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
            //     ]);
            // },
            // "a product with ID 11 does not exist": () => {
            //     controller.repository.products = new Map();
            // }
        }

        // const requestFilter = (req, res, next) => {
        //     if (!req.headers["authorization"]) {
        //         next();
        //         return;
        //     }
        //     req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
        //     next();
        // };

        const opts = {
            ...baseOpts,
            ...(process.env.PACT_URL ? pactChangedOpts : fetchPactsDynamicallyOpts),
            stateHandlers: stateHandlers,
            // requestFilter: requestFilter
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
})