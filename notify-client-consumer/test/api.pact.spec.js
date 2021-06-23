const expect = require('chai').expect;
const { Pact, Matchers } = require("@pact-foundation/pact");
const version = require('md5')('minion');

const Client = {
    model: require("../src/client/model"),
    consumer: require("../src/client/consumer")
};

const mockProvider = new Pact({
    consumer: 'app-notify-client',
    provider: process.env.PACT_PROVIDER ? process.env.PACT_PROVIDER : 'app-client-data',
});

describe('API - Client Contract Testing', () => {
    before(() => mockProvider.setup());
    afterEach(() => mockProvider.verify());
    after(() => mockProvider.finalize());

    describe('Retrieve client\'s contact information', () => {
        it('When searching by name', async () => {
            const expected = {
                "name": "Jena M. Medina",
                "email": "Morbi.quis.urna@tortorIntegeraliquam.org",
                "phone": "(914) 842-4818"
            };

            await mockProvider.addInteraction({
                state: 'a client is found using existent name',
                uponReceiving: 'a request to get a client',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/clients/edina/data`, matcher: `/api/v${version}/clients/[%20\\w\\. ]+/data`}) ,
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

            const api = new Client.consumer(mockProvider.mockService.baseUrl);
            const response = await api.getClientData('edina');
            
            expect(response.status).to.equal(200);
            expect(response.headers).has.a.property('content-type').to.be.contains('application/json');
            expect(response.data).an('object');

            expect(response.data).to.include.all.keys('name', 'email', 'phone');
            expect(response.data).has.a.property('name').which.is.a("string");
            expect(response.data).has.a.property('email').which.is.a("string");
            expect(response.data).has.a.property('phone').which.is.a("string");
        });

        it('Client not found', async () => {
            await mockProvider.addInteraction({
                state: 'a client isn\'t found using unexistent name',
                uponReceiving: 'a request to get a client',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/clients/hello/data`, matcher: `/api/v${version}/clients/[%20\\w\\. ]+/data`}),
                    headers: {
                        authorization: Matchers.like('Bearer Some_valid_Token')
                    },
                },
                willRespondWith: {
                    status: 404
                },
            });

            const api = new Client.consumer(mockProvider.mockService.baseUrl);
            let response = await api.getClientData('hello');
            expect(response).has.a.property('status').which.is.a('number').and.equal(404);
            expect(response).has.a.property('statusText').which.is.a('string').and.equal('Not Found ');
        });

        it('Unauthorized access', async () => {
            await mockProvider.addInteraction({
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

            const api = new Client.consumer(mockProvider.mockService.baseUrl);
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