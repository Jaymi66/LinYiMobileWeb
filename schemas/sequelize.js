var Sequelize = require('sequelize')

var sequelize = new Sequelize('linyimobileweb', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: '3306',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},

	// SQLite only
	storage: 'path/to/database.sqlite'
});

module.exports = sequelize