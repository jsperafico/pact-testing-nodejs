const { data } = require('../data');

const express = require('express');
const router = express.Router();

const Consumer = {
    client: require('../client/consumer')
};
const client = new Consumer.client(process.env.CLIENT_DATA ? process.env.CLIENT_DATA : "localhost:3000")

router.get(`/to/:name`, (req, res) => {
    let element = data.find(entry => entry.client.name.toLocaleLowerCase().includes(req.params.name.toLocaleLowerCase()));
    
    if (element === undefined) {
        res.status(404).send('Client not found');
    } else {
        res.json(element);
    }
});

router.post(`/send`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted. ');
    }

    let element = client.getClientData(req.body.client?.name);
    if (element === undefined) {
        return res.status(409).send('Client dont exists.');
    }
    data.push(req.body);
    res.status(200).send('Notificaiton was sent.');
});

module.exports = router;