const express = require('express');
const Client = {
    consumer: require('./client/consumer'),
    model: require('./client/model'),
};
const Notification = {
    provider: require('./notification/provider'),
    model: require('./notification/model'),
};

let john = new Client.model({
    name: "John",
    email: "oops@oops.com",
    phone: "5551212121"
});
let not1 = new Notification.model({
    client: john,
    message: "This is your first message."
});
console.log(not1);

const PORT = 3000;
const app = express();
app.get('/', (req, res) => {
    res.send('<h1> Home </h1>');
});
app.all('*', (req, res) => {
    res.send('<h1> Not found </h1>');
});
app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
});