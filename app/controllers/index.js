var Zone = require('../schemas/zone')
var Assessment = require('../schemas/assessment')

exports.index = function(req, res){
	Zone.findAll({}).then(function(project){
		console.log(1)
		return project;
	}).then(function(project){
		for(var i = 0; i<project.length; i++){

			var _thisZone = project[i]

			Assessment.count({where: {zoneid: _thisZone.id}}).then(function(count){
				
				_thisZone.dataValues.assessmentInZone = count;

				console.log(4)
				// console.log(_thisZone)
			})
		}
		console.log(2)
		return project;
	}).then(function(project){

		console.log(3)
		res.render('index', {
			title: 'Kinms后台管理',
			zones: project
		})
	})
}


exports.detail = function(req, res){

	var _id = req.params.id

	Zone.findById(_id).then(function(project){

		var _zoneProject = project;

		Assessment.findAll({where: {
			zoneid: _id
		}}).then(function(project){

			res.render('detail', {
				title: "Kinms首页",
				zone: _zoneProject,
				assessments: project
			})
		})

	})

	
}


exports.addAssessment = function(req, res){
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

	
}


// 获取天气
exports.getWeather = function(address){
	// var _url = 'apis.baidu.com';
	// var _data;
	// var _options = {
	// 	protocol: 'https:',
	// 	hostname: _url,
	// 	port: 443,
	// 	path: 'apistore/weatherservice/citylist?cityname=' + address,
	//     method: 'GET',
	//     headers: {
	//     	'apikey': '24be9feed969fe0a3919e4327ec8a93c'
	//     }
	// }

	// https.request(_options, function(_res){
	// 	console.log(_res)
	// 	_res.on('data', function(chunk){
	// 		console.log(chunk)
	// 	})

	// 	_res.on('end', function(){

	// 	})

	// }).on('erro', function(err){
	// 	console.log(ree.message)
	// })

	// return _data;
}