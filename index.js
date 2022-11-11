const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const donations = require('./routes/donations.js');
// const news = require('./routes/news.js');
const mongoose = require('mongoose');
const { donationSchema } = require('./models');

const { donations, login, news, kits, donors } = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/donations', donations);
app.use('/api/news', news);
app.use('/api/login', login);
app.use('/api/kits', kits);
app.use('/api/donors', donors);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// }

app.get("*", (req, res) => {
    res.status(404).send('404 Not Found');
});
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return console.log(err);
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // http.createServer(app).listen(PORT, () => {
    //     console.log(`Server is running on port ${PORT}`);
    // });
});



