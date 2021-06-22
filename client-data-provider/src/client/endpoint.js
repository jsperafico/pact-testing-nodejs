const data = require('../data');

class ClientEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients`, (req, res) => {
            res.json(data);
        });
        this.app.get(`/api/v${this.version}/clients/:name`, (req, res) => {
            res.json(data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            )));
        });
        this.app.post(`/api/v${this.version}/clients`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = ClientEndpoint;