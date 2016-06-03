var express = require('express')
var router = express.Router()

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var User = require('../schemas/user')
var Zone = require('../schemas/zone')



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
		
		var _user = User.findOne({
			where: {
				'username': _username
			}
		}).then(function(project){
			if( !project ){
				console.log('没有该用户')
				res.redirect('/admin/login')
				return;
			} else {
				if( _password == project.dataValues.password ){
					res.redirect('/admin/index');
					return;
				} else {
					res.redirect('/admin/login')
					return;
				}
			}
		})
	} else {
		res.redirect('/admin/login')
	}
})

router.get('/index', function(req, res){
	res.render('admin/index', {
		title: 'Kinms后台管理'
	})
})

router.get('/listZone', function(req, res){

	Zone.findAll({}).then(function(project){
		// console.log(project)
		res.render('admin/listZone', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});
	
})

router.get('/addZone', function(req, res) {
	res.render('admin/addZone', {
		title: 'Kinms后台管理'
	})
})

router.post('/addZone', upload.array(), function(req, res, next){

	console.log('上传文件')
	console.log(req.body.littleimg)
	console.log(req.file)
	next();
	
})


module.exports = router