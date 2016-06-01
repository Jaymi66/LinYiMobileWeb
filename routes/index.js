var express = require('express');
var router = express.Router();

// home page
router.get('/', function(request, response){
	response.render('index', {
		title: "Kinms首页"
	})
})

router.get('/index', function(request, response){
	response.render('index', {
		title: "首页"
	})
})

router.get('/detail', function(request, response){
	response.render('detail', {
		title: "Kinms首页"
	})
})


module.exports = router