const PORT = 3000;

const express = require('express');
const Notification = require('./notification/provider')

const app = express();
app.get('/', (req, res) => {
    res.send('<h1> Home </h1>');
});

const notificationApi = new Notification(app);
notificationApi.setup();

app.all('*', (req, res) => {
    res.send('<h1> Not found </h1>');
});
app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
});