const data = require('../data');
const Client = require('./model');

class ClientEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients`, (req, res) => {
            res.json(data.map(entry => new Client(entry)));
        });
        this.app.get(`/api/v${this.version}/clients/:name`, (req, res) => {
            let element = data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            ));
            if (element === undefined) {
                res.status(404).send('Client not found');
            } else {
                res.json(new Client(element));
            }
        });
        this.app.post(`/api/v${this.version}/clients`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = ClientEndpoint;