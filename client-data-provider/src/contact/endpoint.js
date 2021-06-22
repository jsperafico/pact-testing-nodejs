const data = require('../data');
const loadash = require('loadsh');
const { findClient, version } = require('../common');

const express = require('express');
const router = express.Router();

router.get(`/:name/contact`, (req, res) => {
    let element = findClient(data, req)?.contact;
    if (element === undefined) {
        res.status(404).send('Client not found');
    } else {
        res.json(element);
    }
});

router.patch(`/:name/contact`, (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    let element = findClient(data, req);
    if (element === undefined) {
        return res.status(404).send('Name not found.');
    }
    if (loadash.isEqual(element.contact, req.body)) {
        return res.status(409).send('No reason to update.');
    }
    element.contact = req.body;
    res.status(200).send('Entry updated.');
});

module.exports = router;