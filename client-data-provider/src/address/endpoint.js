const data = require('../data');
const Address = require('./model');
const loadash = require('loadsh');

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
                res.json(element);
            }
        });
        this.app.patch(`/api/v${this.version}/clients/:name/address`, (req, res) => {
            if (req.body === undefined) {
                return res.status(400).send('Please provide an entry to be inserted.');
            }
            let element = data.find(entry => entry.name.toLocaleLowerCase() == req.params.name.toLocaleLowerCase());
            if (element === undefined) {
                return res.status(404).send('Name not found.');
            }
            if (loadash.isEqual(element.address, req.body)) {
                return res.status(409).send('No reason to update.');
            }
            element.address = req.body;
            res.status(200).send('Entry updated.');
        });
    }
}

module.exports = AddressEndpoint;