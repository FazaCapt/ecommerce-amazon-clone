var express = require('express');

var app = express();

// app.get('/');
//  ini contoh: 
// app.get('/name', function(req, res) {
//     var name = 'Faza';
//     res.json('My name is ' + name);
// });

app.get('/', function(req, res) {
    var name = 'Faza';
    res.json('My name is ' + name);
});

// app.post();

// app.put()

// app.delete('/delete')



app.listen(3000, function(err) {
    if(err) throw err;
    console.log('Server is Running on port 3000');
});