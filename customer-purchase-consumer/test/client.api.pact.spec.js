const { expect } = require('chai');
const { Pact, Matchers } = require('@pact-foundation/pact');
const version = require('md5')('minion');

const Consumers = {
    client: require('../src/clients/consumer')
};

const mockClientProvider = new Pact({
    consumer: 'app-customer-purchase',
    provider: 'app-client-data'
});

describe('API - Client Contract Testing', () => {
    before(() => mockClientProvider.setup());
    afterEach(() => mockClientProvider.verify());
    after(() => mockClientProvider.finalize());

    describe('Retrieve client\'s information', () => {
        it('When searching by name', async () => {
            const expected = {
                "id": 8,
                "name": "Golden, Poppie",
                "email": "any@email.org",
                "address": {
                    "line1": "510-7858 Ipsum Av.",
                    "line2": "",
                    "zipcode": 8628,
                    "city": "Hamme",
                    "country": "Paraguay"
                }
            };

            await mockClientProvider.addInteraction({
                state: 'a client is found using existent name',
                uponReceiving: 'a request to get a client',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/clients/Golden/data`, matcher: `/api/v${version}/clients/[%20\\w\\. ]+/data`}) ,
                    headers: {
                        authorization: Matchers.like('Bearer Some_valid_Token')
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'content-type': Matchers.regex({
                            generate: 'application/json; charset=utf-8',
                            matcher: 'application/json;?.*'
                        }),
                    },
                    body: Matchers.like(expected),
                }
            });

            const api = new Consumers.client(mockClientProvider.mockService.baseUrl);
            const response = await api.getClientData('Golden');

            expect(response.status).to.equal(200);
            expect(response.headers).has.a.property('content-type').to.be.contains('application/json');
            expect(response.data).an('object');

            expect(response.data).to.include.all.keys('id', 'name', 'email', 'address');
            expect(response.data).has.a.property('id').which.is.a("number");
            expect(response.data).has.a.property('name').which.is.a("string");
            expect(response.data).has.a.property('email').which.is.a("string");
            expect(response.data).has.a.property('address').which.is.a("object");
            expect(response.data.address).has.a.property('line1').which.is.a("string");
            expect(response.data.address).has.a.property('line2').which.is.a("string");
            expect(response.data.address).has.a.property('zipcode').which.is.a("number");
            expect(response.data.address).has.a.property('city').which.is.a("string");
            expect(response.data.address).has.a.property('country').which.is.a("string");
        });

        it('Client not found', async () => {
            await mockClientProvider.addInteraction({
                state: 'a client isn\'t found using unexistent name',
                uponReceiving: 'a request to get a client',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/clients/hello/data`, matcher: `/api/v${version}/clients/[%20\\w\\.\\, ]+/data`}) ,
                    headers: {
                        authorization: Matchers.like('Bearer Some_valid_Token')
                    },
                },
                willRespondWith: {
                    status: 404,
                }
            });

            const api = new Consumers.client(mockClientProvider.mockService.baseUrl);
            let response = await api.getClientData('hello');
            expect(response).has.a.property('status').which.is.a('number').and.equal(404);
            expect(response).has.a.property('statusText').which.is.a('string').and.equal('Not Found ');
        });

        it('Unauthorized access', async () => {
            await mockClientProvider.addInteraction({
                state: 'Authorization token is invalid',
                uponReceiving: 'a request to get a client',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/clients/hello/data`, matcher: `/api/v${version}/clients/[%20\\w\\. ]+/data`}) ,
                    headers: {
                        authorization: 'Bearer Some_Invalid_Token'
                    },
                },
                willRespondWith: {
                    status: 401
                },
            });

            const api = new Consumers.client(mockClientProvider.mockService.baseUrl);
            let response = await api.getClientData(
                'nathan',
                {
                    authorization: 'Bearer Some_Invalid_Token'
                }
            );
            expect(response).has.a.property('status').which.is.a('number').and.equal(401);
            expect(response).has.a.property('statusText').which.is.a('string').and.equal('Unauthorized ');
        });
    });
});