'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/dashboard' , (req, res) => {
    res.sendFile(__dirname + '/views/dashboard.html');
});

app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'));
});