const data = require('../data');

class ContactEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/contact`, (req, res) => {
            res.json(data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            )).contact)
        });
        this.app.put(`/api/v${this.version}/clients/:name/contact`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = ContactEndpoint;