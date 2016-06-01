var express = require('express')
var router = express.Router()

var User = require('../schemas/user')


// admin page
router.get('/', function(req, res){
	res.render('admin/login', {
		title: 'Kinms后台管理'
	})
})

router.get('/login', function(req, res) {
	res.render('admin/login', {
		title: 'Kinms后台管理'
	})
})

router.post('/login', function(req, res) {

	if( req.body.username && req.body.password ){

		var _username = req.body.username;
		var _password = req.body.password;
		console.log(_username, _password)
		var user = User.build({
			'id': '2',
			'username': 'admin',
			'password': '123456'

		})
		user.save();
	}
})

router.get('/index', function(req, res){
	res.render('admin/index', {
		title: 'Kinms后台管理'
	})
})


module.exports = router