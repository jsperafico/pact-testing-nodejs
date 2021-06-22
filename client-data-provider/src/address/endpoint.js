const data = require('../data');

class AddressEndpoint {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/address`, (req, res) => {
            res.json(data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            )).address)
        });
        this.app.put(`/api/v${this.version}/clients/:name/address`, (req, res) => {
            console.log('Don\'t know how to send a post yet');
        });
    }
}

module.exports = AddressEndpoint;