const data = require('../data');
const Address = require('./model');

class AddressEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/address`, (req, res) => {
            let element = data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            ))?.address;
            if (element === undefined) {
                res.status(404).send('Client not found');
            } else {
                res.json(new Address(element));
            }
        });
        this.app.put(`/api/v${this.version}/clients/:name/address`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = AddressEndpoint;