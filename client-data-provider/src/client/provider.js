let data = require('../data');

class ClientProvider {
    constructor(app) {
        this.app = app;
        this.version = require('md5')('minion');
    }

    setup() {
        this.app.get(`/api/v${this.version}/clients/:name/data`, (req, res) => {
            let element = data.find(entry => entry.name.toLocaleLowerCase().includes(
                req.params.name.toLocaleLowerCase()
            ));
            
            res.status(200).json(element);
        });
    }
}

module.exports = ClientProvider;