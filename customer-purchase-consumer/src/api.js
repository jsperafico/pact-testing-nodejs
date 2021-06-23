const PORT = 3000;

const express = require('express');
const app = new express();

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1>');
});

app.use('/api', express.json());

const {version} = require('./common');
app.use(`/api/v${version}/purchases`, require('./purchase/endpoint'));

app.get('*', (req, res) => {
    res.send('<h1>Not found </h1>');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});