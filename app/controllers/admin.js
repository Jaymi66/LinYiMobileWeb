var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	// 添加后缀名
	filename: function (req, file, cb) {
		var _suffix = file.originalname.split('.');
		cb(null, file.fieldname + '_' + Date.now() + '.' + _suffix[_suffix.length-1]);
	}
})
var upload = multer({storage: storage});

var User = require('../schemas/user')
var Zone = require('../schemas/zone')
var Assessment = require('../schemas/assessment')


// 渲染login
exports.showLogin = function(req, res){
	res.render('admin/login')
}

// login操作
exports.login = function(req, res) {
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
}

// 渲染index
exports.showIndex = function(req, res){
	res.render('admin/index')
}

// 渲染ListZone
exports.showListZone = function(req, res){

	Zone.findAll({}).then(function(project){
		// console.log(project)
		res.render('admin/listZone', {
			zones: project
		})
		return project;
	});
	
}

// 渲染 AddZone
exports.showAddZone = function(req, res) {
	res.render('admin/addZone', {
		zone: {
			id: '',
			title: '',
			pinyintitle: '',
			littleimg: '',
			img: '',
			voice: '',
			intro: '',
			type: '',
			opentime: '',
			address: '',
			phone: '',
			route: ''
		}
	})
}

// 上传文件列表
exports.uploadZoneFileList = upload.fields([{
										name: 'uploadLittleimg',
										maxCount: 1
									}, {
										name: 'uploadImg',
										maxCount: 1
									}, {
										name: 'uploadVoice',
										maxCount: 1
									}]);

// 上传操作
exports.uploadZoneFile = function(req, res, next){
	var _uploadLittleimg = req.files.uploadLittleimg;
	var _uploadImg = req.files.uploadImg;
	var _uploadVoice = req.files.uploadVoice;

	if(_uploadLittleimg) req.body.littleimg = "/uploads/" + _uploadLittleimg[0].filename;
	if(_uploadImg) req.body.img = "/uploads/" + _uploadImg[0].filename;
	if(_uploadVoice) req.body.voice = "/uploads/" + _uploadVoice[0].filename;
	next();
}

// addZone
exports.addZone = function(req, res){

	if( req.body.id ){

		Zone.findById(req.body.id).then(function(project){

			var _zone = {
				title: req.body.title,
				pinyintitle: req.body.pinyintitle,
				intro: req.body.intro,
				type: req.body.type,
				opentime: req.body.opentime,
				address: req.body.address,
				phone: req.body.phone,
				route: req.body.route
			};

			if( req.body.img ) _zone.img = req.body.img
			if( req.body.littleimg ) _zone.littleimg = req.body.littleimg
			if( req.body.voice ) _zone.voice = req.body.voice

			Zone.update(_zone, {
				where: {
					id: req.body.id
				}
			}).then(function(project){
				if(project){
					console.log('修改成功');
					res.redirect('/admin/listZone');
					return;
				} else {
					console.log('修改失败')
					return false;
				}
			})

			return project;

		})

	} else {
		var zone = Zone.build({
			littleimg: req.body.littleimg,
			title: req.body.title,
			pinyintitle: req.body.pinyintitle,
			img: req.body.img,
			voice: req.body.voice,
			intro: req.body.intro,
			type: req.body.type,
			opentime: req.body.opentime,
			address: req.body.address,
			phone: req.body.phone,
			route: req.body.route
		})
		zone.save().then(function(project){
			if(project){
				console.log('插入成功');
				res.redirect('/admin/listZone');
				return;
			} else {
				console.log('插入失败')
				return false;
			}
		})
	}

}

// 修改
exports.updateZone = function(req, res){
	
	var _id = req.params.id;

	Zone.findById(_id).then(function(project){
		if(project){

			res.render('admin/addZone', {
				zone: project
			})
		}
	})

	
}

// 删除
exports.removeZone = function(req, res){
	// console.log('执行删除' + req.params.id)

	Zone.destroy({where: {id: req.params.id}}).then(function(project){
		if(project){
			res.redirect('/admin/listZone')
		}
		return;
	})
}

// 管理留言
exports.listAssessment = function(req, res){

	var _id = req.params.id;
	Assessment.findAll({where: {
		zoneid: _id
	}}).then(function(project){
		res.render('admin/listAssessment', {
			assessment: project
		})
	})
}

exports.removeAssessment = function(req, res){
	console.log(req.params.zoneid)
	console.log(req.params.id)

	var _zoneid = req.params.zoneid;
	var _id = req.params.id;

	Assessment.destroy({where: {
		id: _id,
		zoneid: _zoneid
	}}).then(function(project){
		console.log(project);

		if(project){
			res.redirect('/admin/listAssessment/'+_zoneid);
		}
	})
}















