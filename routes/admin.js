var express = require('express')
var router = express.Router()

// admin page
router.get('/', function(request, response){
	response.render('admin/index', {
		title: 'Kinms后台管理'
	})
})

module.exports = router