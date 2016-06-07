var express = require('express');
var router = express.Router();

var https = require('https')

var Zone = require('../schemas/zone')
var Assessment = require('../schemas/assessment');
var moment = require('moment')



function index(req, res){
	Zone.findAll({}).then(function(project){
		// console.log(project)
		res.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
		return;
	});
}
// home page
router.get('/', index)
router.get('/index', index)

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




function getWeather(address){


	console.log(address)

	var _url = 'apis.baidu.com';
	var _data;
	var _options = {
		protocol: 'https:',
		hostname: _url,
		port: 443,
		path: 'apistore/weatherservice/citylist?cityname=' + address,
	    method: 'GET',
	    headers: {
	    	'apikey': '24be9feed969fe0a3919e4327ec8a93c'
	    }
	}

	https.request(_options, function(_res){
		console.log(_res)


		_res.on('data', function(chunk){
			console.log(chunk)
		})

		_res.on('end', function(){

		})

	}).on('erro', function(err){
		console.log(ree.message)
	})

	return _data;
}



router.get('/getWeather', function(req, res){

	var weather = getWeather('济南');

	res.send('123');


})

module.exports = router