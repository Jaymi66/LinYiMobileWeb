var express = require('express');
var router = express.Router();

// home page
router.get('/', function(request, response){
	response.render('index', {
		title: "Kinms首页"
	})
})

router.get('/list', function(request, response){
	response.render('list', {
		title: "Kinms首页"
	})
})


module.exports = router