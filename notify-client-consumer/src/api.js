const PORT = 3000;

const express = require('express');
const app = express();
const { version } = require('../package.json');

app.use('/api', [express.json()]);

app.get('/', (req, res) => {
    res.send('<h1> Home </h1>');
});

app.use(`/api/v${version}/notifications`, require('./notification/endpoint'));

app.all('*', (req, res) => {
    res.send('<h1> Not found </h1>');
});
app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
});