const { Verifier } = require("@pact-foundation/pact");
const minion = require('md5')('minion');

const express = require('express');
const app = new express();
app.use('/api', [require('../src/middleware'), express.json()]);
app.use(`/api/v${minion}/clients/`,
    require('../src/client/provider'));

const PORT = 8080;
const server = app.listen(`${PORT}`);
const { load, clear, data } = require('../src/data');

describe('API - Contract Testing', () => {
    it(`validates the expectations for consumers versions`, () => {
        let token = "Bearer INVALID TOKEN";
        let opts = {
            provider: "app-client-data",
            logLevel: "INFO",
            providerBaseUrl: `http://localhost:${PORT}`,
            requestFilter: (req, res, next) => {
                req.headers["authorization"] = `${token}`;
                next();
            },
            stateHandlers: {
                "a client is found using existent name": () => {
                    token = "Bearer shouldWork";
                    clear();
                    load();
                    data.push({
                        id: 5,
                        name: "Medina, Jena M.",
                        dob: "12/12/2012",
                        contact: {
                            email: "some@email.org",
                            phone: "99595"
                        },
                        address: {
                            line1: "493-6750 Vitae, Rd.",
                            line2: "",
                            zipcode: 202358,
                            city: "Constitución",
                            country: "Sint Maarten"
                        }
                    });
                    data.push({
                        id: 20,
                        name: "Golden Retriever",
                        dob: "20/02/2012",
                        contact: {
                            email: "maybe@email.org",
                            phone: "445441"
                        },
                        address: {
                            line1: "493-6750 Vitae, Rd.",
                            line2: "",
                            zipcode: 202358,
                            city: "Constitución",
                            country: "Sint Maarten"
                        }
                    });
                },
                "a client isn't found using unexistent name": () => {
                    token = "Bearer shouldWork";
                    clear();
                },
                "Authorization token is invalid": () => {
                    clear();
                    load();
                    token = "shouldn't Work";
                }
            },
            pactBrokerUrl: "http://localhost:9292",
            providerVersion: minion,
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
})