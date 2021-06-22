const PORT = 3000;

const authorized = require('./middleware');
const express = require('express');
const app = new express();

app.use('/api', [authorized, express.json()]);
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1>');
});

const { version } = require('./common');

app.use(`/api/v${version}/clients`, 
        require('./client/endpoint'), 
        require('./address/endpoint'), 
        require('./contact/endpoint'));

const minion = require('md5')('minion');
app.use(`/api/v${minion}/clients/`, 
        require('./client/provider'));

app.get('*', (req, res) => {
    res.send('<h1>Not found</h1>');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});