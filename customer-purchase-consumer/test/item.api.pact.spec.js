const { expect } = require('chai');
const { Pact, Matchers } = require('@pact-foundation/pact');
const version = require('md5')('Luck Skywalker');

const Consumers = {
    item: require('../src/items/consumer')
};

const mockItemProvider = new Pact({
    consumer: 'app-customer-purchase',
    provider: 'app-item-data',
});

describe('API - Item Contract Testing', () => {
    before(() => mockItemProvider.setup());
    afterEach(() => mockItemProvider.verify());
    after(() => mockItemProvider.finalize());

    describe('Retrieve item\'s information', () => {
        it('When searching by label', async () => {
            const expected = {
                "id": 1,
                "label": "Chocolate bar",
                "price": 10
            };

            await mockItemProvider.addInteraction({
                state: 'an item is found using existent label',
                uponReceiving: 'a request to get an item',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/items/water/data`, matcher: `/api/v${version}/items/[%20\\w\\. ]+/data`}),
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

            const api = new Consumers.item(mockItemProvider.mockService.baseUrl);
            const response = await api.getItemData('water');

            expect(response.status).to.equal(200);
            expect(response.headers).has.a.property('content-type').to.be.contains('application/json');
            expect(response.data).an('object');

            expect(response.data).to.include.all.keys('id', 'label', 'price');
            expect(response.data).has.a.property('id').which.is.a("number");
            expect(response.data).has.a.property('label').which.is.a("string");
            expect(response.data).has.a.property('price').which.is.a("number");
        });
        it('Item not found', async () => {
            await mockItemProvider.addInteraction({
                state: 'an item isn\'t found using unexistent label',
                uponReceiving: 'a request to get an item',
                withRequest: {
                    method: 'GET',
                    path: Matchers.term({generate: `/api/v${version}/items/hello/data`, matcher: `/api/v${version}/items/[%20\\w\\. ]+/data`}),
                },
                willRespondWith: {
                    status: 404
                }
            });

            const api = new Consumers.item(mockItemProvider.mockService.baseUrl);
            const response = await api.getItemData('hello');

            expect(response).has.a.property('status').which.is.a('number').and.equal(404);
            expect(response).has.a.property('statusText').which.is.a('string').and.equal('Not Found ');
        });
    });
});