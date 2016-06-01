// var sequelize = require('./sequelize');

var Sequelize = require('sequelize')

var sequelize = new Sequelize('linyimobileweb', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: '3306',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var User = sequelize.define('user', {
	id: {
		primaryKey: true, // 主键
		type: Sequelize.INTEGER, // 类型
		autoIncrement : true, // 自增
		unique: true, // 值唯一
		field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
	},
	password: {
	type: Sequelize.STRING
	}
}, {
  	freezeTableName: true // Model tableName will be the same as the model name
});




module.exports = User