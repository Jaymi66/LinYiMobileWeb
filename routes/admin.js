var express = require('express')
var router = express.Router()

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


	var _username = req.query.username;
	var _password = req.query.password;

	console.log(_username)
	console.log(req)
	// res.render('admin/index')
})

router.get('/index', function(req, res){
	res.render('admin/index', {
		title: 'Kinms后台管理'
	})
})


module.exports = router