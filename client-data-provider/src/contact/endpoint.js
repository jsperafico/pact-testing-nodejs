const data = require('../data');
const Contact = require('./model');

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
                res.json(new Contact(element));
            }
        });
        this.app.put(`/api/v${this.version}/clients/:name/contact`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = ContactEndpoint;