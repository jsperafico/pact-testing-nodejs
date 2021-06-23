const { findClient } = require('../common');
let { data } = require('../data');

const express = require('express');
const router = express.Router();

router.get(`/:name/data`, (req, res) => {
    let element = findClient(data, req);

    if (element === undefined) {
        return res.status(404).send('Unable to find client.');
    }
    
    res.status(200).json({
        name: element.name,
        email: element.contact.email,
        phone: element.contact.phone
    });
});

module.exports = router;