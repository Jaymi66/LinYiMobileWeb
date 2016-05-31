'use strict'

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');

var routes = require('./routes/index');
var admin = require('./routes/admin');


app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'jade');
// 静态资源文件路径
app.use("/", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer());

app.use('/', routes);
app.use('/admin', admin);


var server = app.listen(port, function(){
	var host = server.address().address;
	// console.log(host);
	console.log('kinms listening at http://localhost:'+port);
});