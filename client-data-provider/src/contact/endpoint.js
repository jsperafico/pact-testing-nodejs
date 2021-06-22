const data = require('../data');
const Contact = require('./model');
const loadash = require('loadsh');

class ContactEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/contact`, (req, res) => {
            let element = data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            ))?.contact;
            if (element === undefined) {
                res.status(404).send('Client not found');
            } else {
                res.json(element);
            }
        });
        this.app.patch(`/api/v${this.version}/clients/:name/contact`, (req, res) => {
            if (req.body === undefined) {
                return res.status(400).send('Please provide an entry to be inserted.');
            }
            let element = data.find(entry => entry.name.toLocaleLowerCase() == req.params.name.toLocaleLowerCase());
            if (element === undefined) {
                return res.status(404).send('Name not found.');
            }
            if (loadash.isEqual(element.contact, req.body)) {
                return res.status(409).send('No reason to update.');
            }
            element.contact = req.body;
            res.status(200).send('Entry updated.');
        });
    }
}

module.exports = ContactEndpoint;