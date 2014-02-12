
var express = require('express');
var path = require('path');
var app = module.exports = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'app')));
});

app.listen(3000);
