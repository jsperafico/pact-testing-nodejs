const PORT = 3000;

const authorized = require('./middleware');
const express = require('express');
const app = new express();

app.use('/api', [authorized, express.json()]);
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1>');
});

const ClientEndpoint = require('./client/endpoint');
const clientEndpoint = new ClientEndpoint(app);
clientEndpoint.setup();

const AddressEndpoint = require('./address/endpoint');
const addressEndpoint = new AddressEndpoint(app);
addressEndpoint.setup();

const ContactEndpoint = require('./contact/endpoint');
const contactEndpoint = new ContactEndpoint(app);
contactEndpoint.setup();

const ClientProvider = require('./client/provider');
const clientProvider = new ClientProvider(app);
clientProvider.setup();

app.get('*', (req, res) => {
    res.send('<h1>Not found</h1>');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});