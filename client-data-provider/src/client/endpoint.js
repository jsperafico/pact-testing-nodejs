let { data } = require('../data');
const { findClient } = require('../common');

const express = require('express');
const router = express.Router();

router.get(`/`, (req, res) => {
    res.json(data.map(entry => entry));
});

router.get(`/:name`, (req, res) => {
    let element = findClient(data, req);
    if (element === undefined) {
        res.status(404).send('Client not found');
    } else {
        res.json(element);
    }
});

router.post(`/`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    if (data.find(entry => entry.name.toLocaleLowerCase() == req.body.name.toLocaleLowerCase())) {
        return res.status(409).send('Client already exists.');
    }
    data.push(req.body);
    res.status(201).send('client information added.');
});

module.exports = router;