var express = require('express');
var morgan = require('morgan'); 

var app = express();

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