var express = require('express');
var router = express.Router();

var Zone = require('../schemas/zone')

// home page
router.get('/', function(request, response){
	Zone.findAll({}).then(function(project){
		// console.log(project)
		response.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});
})

router.get('/index', function(request, response){

	Zone.findAll({}).then(function(project){
		// console.log(project)
		response.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});

	// response.render('index', {
	// 	title: "首页"
	// })
})

router.get('/detail', function(request, response){

	response.render('detail', {
		title: "Kinms首页"
	})
})


module.exports = router