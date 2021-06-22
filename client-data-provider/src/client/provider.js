const { findClient } = require('../common');
let data = require('../data');

const express = require('express');
const router = express.Router();

router.get(`/:name/data`, (req, res) => {
    let element = findClient(data, req);
    
    res.status(200).json(element);
});

module.exports = router;