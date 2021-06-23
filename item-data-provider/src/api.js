const PORT = 3000;

const express = require('express');
const app = new express();

app.use('/api', [express.json()]);

const { version } = require('./common');
app.use(`/api/v${version}/items`, require('./items/endpoint'));

app.get('*', (req, res) => {
    res.send('<h1>Not found</h1>');
});

app.list(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});