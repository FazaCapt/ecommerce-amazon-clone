var express = require('express');
var morgan = require('morgan'); 
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://root:abc123@ds117592.mlab.com:17592/ecommerce', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('connected to the database. Yes!');
    }
});

// middleware
app.use(morgan('dev')); 

app.get('/', function(req, res) {
    var name = 'Faza';
    res.json('My name is ' + name);
});

app.get('/catwoman', function (req, res) {
    res.json('batman')
});

app.listen(3000, function(err) {
    if(err) throw err;
    console.log('Server is Running on port 3000');
});