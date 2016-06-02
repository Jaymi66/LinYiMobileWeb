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

var Zone = sequelize.define('zone', {
	'id': {
		'primaryKey': true, // 主键
		'allowNull': false, // 是否允许为NULL
		'type': Sequelize.INTEGER, // 类型
		'autoIncrement' : true, // 自增
		'unique': true, // 值唯一
		// 'field': 'first_name' //  如果有该参数  使用此参数作为字段名称
	},
	'littleimg': { // 预览图
		'type': Sequelize.STRING,
		'allownull': false
	},
	'title': { // 标题
		'type': Sequelize.STRING,
		'allowNull': false
	},
	'pinyintitle': { // 拼音标题
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'praise': { // 赞
		'type': Sequelize.INTEGER,
		'allowNull': true
	},
	'img': { // 详情大图
		'type': Sequelize.STRING,
		'allowNull': false
	},
	'voice': { // 语音
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'intro': { // 简介
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'type': { // 类型
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'opentime': { // 开放时间
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'address': { // 地址
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'phone': { // 电话
		'type': Sequelize.STRING,
		'allowNull': true
	},
	'route': { // 游览路线
		'type': Sequelize.STRING,
		'allowNull': true
	}

}, {
  	'freezeTableName': true, // Model tableName will be the same as the model name
  	'tableName': 'zone',
  	'timestamps': false,
  	'createdAt': false
});

module.exports = Zone