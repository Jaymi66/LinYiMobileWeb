var express = require('express')
var router = express.Router()

// admin page
router.get('/', function(req, res){
	res.render('admin/login', {
		title: 'Kinms后台管理'
	})
})

router.get('/login:username&:password', function(req, res) {
	console.log(req.params.username)
	res.render('admin/index')
})

router.get('/index', function(req, res){
	res.render('admin/index', {
		title: 'Kinms后台管理'
	})
})


module.exports = router