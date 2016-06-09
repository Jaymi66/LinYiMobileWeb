var Sequelize = require('sequelize')

var sequelize = new Sequelize('linyimobileweb', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: '3306',
	pool: { // 链接池
		max: 5,
		min: 0,
		idle: 10000
	}
});

var User = sequelize.define('user', {
	'id': {
		'primaryKey': true, // 主键
		'allowNull': false, // 是否允许为NULL
		'type': Sequelize.INTEGER, // 类型
		'autoIncrement' : true, // 自增
		'unique': true, // 值唯一
		// 'field': 'first_name' //  如果有该参数  使用此参数作为字段名称
	},
	'username': {
		'type': Sequelize.STRING,
		'allownull': false
	},
	'password': {
		'type': Sequelize.STRING,
		'allowNull': false
	}

}, {
  	'freezeTableName': true, // Model tableName will be the same as the model name
  	'tableName': 'user',
  	'timestamps': false,
  	'createdAt': false
});

module.exports = User