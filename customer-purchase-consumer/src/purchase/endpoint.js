const loadash = require('loadsh');

const express = require('express');
const router = express.Router();

const Consumers = {
    clients: require('../clients/consumer'),
    items: require('../items/consumer')
};
const clients = new Consumers.clients(process.env.CLIENT_DATA ? process.env.CLIENT_DATA : "localhost:3000");
const items = new Consumers.items(process.env.ITEM_DATA ? process.env.ITEM_DATA : "localhost:3001");
const { data } = require('../data');

router.post(`/`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    const client = clients.getClientData(req.body.client.name);
    if (client === undefined || !loadash.isEqual(client.id, req.body.client.id)) {
        return res.status(409).send('Client undefined or different id.');
    }
    let matched = 0;
    for (let index = 0; index < req.body.items.length; index++) {
        const element = array[index];
        const item = items.getItemData(element.id);
        if (item === undefined || !loadash.isEqual(item.label, element.label)) {
            matched++;
        }
    }
    if (matched == req.body.items.length - 1) {
        return res.status(409).send('Please verify content of your request.');
    }
    data.push(req.body);
    res.status(201).send('Entry added.');
});

router.get(`/:id`, (req, res) => {
    let purchase = data.find(entry => `${entry.id}`.includes(req.params.id));
    if (purchase === undefined) {
        return res.status(404).send('Purchase not found.');
    }
    res.json(purchase);
});

router.patch(`/:id`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    let purchase = data.find(entry => `${entry.id}`.includes(req.params.id));
    if (purchase === undefined) {
        return res.status(404).send('Purchase not found.');
    }
    if (loadash.isEqual(purchase, req.body)) {
        return res.status(409).send('No reason to update.');
    }
    purchase.client = req.body.client;
    purchase.items = req.body.items;
    res.status(200).send('Entry Updated.');
});

router.get(`/client/:name`, (req, res) => {
    let purchases = data.find(entry => entry.client.name.toLocaleLowerCase().includes(
        req.params.name.toLocaleLowerCase()
    ));
    if (purchases === undefined) {
        return res.status(404).send('Name not found.');
    }
    res.json(purchases);
});

module.exports = router;