var mysql = require('mysql');  

// 数据库名称
var DATABASE = 'linyimobileweb';

//创建连接  
var client = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306'
});

client.connect();
client.query("use " + DATABASE);

module.exprots = client