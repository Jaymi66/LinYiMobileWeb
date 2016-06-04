var express = require('express');
var router = express.Router();

var Zone = require('../schemas/zone')
var Assessment = require('../schemas/assessment');
var moment = require('moment')

// home page
router.get('/', function(req, res){
	Zone.findAll({}).then(function(project){
		// console.log(project)
		res.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});
})

router.get('/index', function(req, res){

	Zone.findAll({}).then(function(project){
		// console.log(project)
		res.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});

})

// 详情页面
router.get('/detail/:id', function(req, res){

	var _id = req.params.id

	Zone.findById(_id).then(function(project){

		var _zoneProject = project;

		Assessment.findAll({where: {
			zoneid: _id
		}}).then(function(project){

			res.render('detail', {
				title: "Kinms首页",
				zone: _zoneProject,
				assessments: project,
				moment: moment
			})
		})

	})

	
})

router.get('/addAssessment/:id', function(req, res){
	res.render('addAssessment', {
		title: 'Kinms首页',
		zoneid: req.params.id
	})
})

router.post('/addAssessment', function(req, res){
	var _zoneid = req.body.zoneid;
	var _star = req.body.star;
	var _content = req.body.content;
	console.log(_zoneid)

	var project = Assessment.build({
		zoneid: _zoneid,
		star: _star,
		content: _content
	});

	project.save().then(function(project){
		if(project){
			console.log('添加评论成功')
			res.redirect('/detail/'+_zoneid)
			return;
		}else{
			console.log('添加评论失败')
			return;
		}
	})

	
})


module.exports = router