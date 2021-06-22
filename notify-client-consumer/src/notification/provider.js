const Client = {
    model: require('../client/model'),
    consumer: require('../client/consumer')
}

class NotificationProvider {
    constructor(app) {
        this.app = app;
        this.version = require('../../package.json').version;
        this.client = new Client.consumer(process.env.CLIENT_DATA ? process.env.CLIENT_DATA : "localhost:3000")
    }

    setup() {
        this.app.get(`/api/v${this.version}/notifications/to/:name`, (req, res) => {
            console.log(req.params.name);
            res.json();
        });
        this.app.post(`/api/v${this.version}/notifications/send`, (req, res) => {
            res.status(200);
        });
    }
}

module.exports = NotificationProvider;