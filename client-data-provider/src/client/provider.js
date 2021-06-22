let data = require('../data');
const findClient = require('../common');

class ClientProvider {
    constructor(app) {
        this.app = app;
        this.version = require('md5')('minion');
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/data`, (req, res) => {
            let element = findClient(data, req);
            
            res.status(200).json(element);
        });
    }
}

module.exports = ClientProvider;