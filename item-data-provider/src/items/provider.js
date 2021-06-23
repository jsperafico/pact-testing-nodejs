const { data } = require('../data');
const express = require('express');
const route = express.Router();

route.get('/:label/data', (req, res) => {
    let element = findItem(req);
    if (element === undefined) {
        res.status(404).send('Item not found');
    } else {
        res.json(element);
    }
});

const findItem = (req) => {
    return data.find(entry => entry.label.toLocaleLowerCase().includes(req.params.label.toLocaleLowerCase()));
};

module.exports = route;