// Kjøring av servern på heroku

var path = require('path');
var express = require('express');

var app = express();

app.use('/', express.static(path.join(__dirname, './build')));
app.set('port', process.env.PORT || 8080);

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

var server = app.listen(app.get('port'), function() {
    console.log('listening on port ', server.address().port);
});
