let { data } = require('../data');
const loadash = require('loadsh');
const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.json(data);
});

route.get('/:id', (req, res) => {
    let element = findItem(req);
    if (element === undefined) {
        res.status(404).send('Item not found');
    } else {
        res.json(element);
    }
});

route.post('/', (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send('Please provide an entry to be inserted.');
    }
    if (data.find(entry => entry.label.toLocaleLowerCase() == req.body.label.toLocaleLowerCase())) {
        return res.status(409).send('Item already exists.');
    }
    data.push(req.body);
    res.status(201).send('Item information added.');
});

route.patch('/:id', (req, res) => {
    let element = findItem(req);
    if (element === undefined) {
        res.status(404).send('Item not found');
    }
    if (loadash.isEqual(element, req.body)){
        return res.status(409).send('No reason to update.');
    }
    element.label = req.body.label;
    element.description = req.body.description;
    element.price = req.body.price;
    element.image = req.body.image;
    res.status(201).send('client information added.');
});

route.delete('/:id', (req, res) => {
    let element = findItem(req);
    if (element === undefined) {
        res.status(404).send('Item not found');
    }
    var index = data.indexOf(element);
    if (index !== -1) {
        data.splice(index, 1);
    }
    res.status(200).send('Item removed.');
});

const findItem = (req) => {
    return data.find(entry => `${entry.id}` == req.params.id.toLocaleLowerCase());
};

module.exports = route;