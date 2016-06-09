'use strict'

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');


app.set("views", path.join(__dirname, "app/views"));
app.set('view engine', 'jade');
// 静态资源文件路径
app.use("/", express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.locals.pretty = true
}

// site配置信息
app.locals.title = '旅游网';
app.locals.description = 'description';
app.locals.keywords = 'keywords';
app.locals.author = 'author';
app.locals.indexImg = '/images/top1.png';
app.locals.indexContent = '中国曲阜国际孔子文化节,中国曲阜国际孔子文化节';

// 路由
require('./config/routers')(app)

// app 加载moment
app.locals.moment = require('moment');

var server = app.listen(port, function(){
	var host = server.address().address;
	// console.log(host);
	console.log('kinms listening at http://localhost:'+port);
});