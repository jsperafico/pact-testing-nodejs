const data = require('../data');
const loadash = require('loadsh');
const { findClient, version } = require('../common');

const express = require('express');
const router = express.Router();

router.get(`/:name/address`, (req, res) => {
    let element = findClient(data, req)?.address;
    if (element === undefined) {
        res.status(404).send('Client not found');
    } else {
        res.json(element);
    }
});

router.patch(`/:name/address`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    let element = findClient(data, req);
    if (element === undefined) {
        return res.status(404).send('Name not found.');
    }
    if (loadash.isEqual(element.address, req.body)) {
        return res.status(409).send('No reason to update.');
    }
    element.address = req.body;
    res.status(200).send('Entry updated.');
});

module.exports = router;