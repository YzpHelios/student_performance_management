/*
*查找老师页面路由
*@author: yuanzp
*@date  : 2016/9/18
*/

var express = require('express'),
	router = express.Router(),
	Teacher = require('../models/teacher'),
	SEARCH_TITLE = '查找老师';

router.get('/',function(req,res){
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  

  	if(req.session.username){    
          
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  	}else{

        res.redirect('/login');
        return;    
  	}
	res.render('search_Teacher',{title:SEARCH_TITLE});
});

router.post('/search/:searchTxt?',function(req,res){
	if (req.params.searchTxt) {
		Teacher.getTeacherByTnoTname(req.params.searchTxt,function(err,results){

			if (results == null) {
				err = '没有找到该老师';
			}
			if (err) {
				res.locals.error =err;
				res.render('search_Teacher',{title:SEARCH_TITLE});
				return;
			}else {
				res.json(results);
				console.log(results.tNo);
			}


		});
	}
});

router.post('/del/:tNo?',function(req,res){
	if (req.params.tNo) {
		Teacher.delTeacher(req.params.tNo,function(err,results){
			if (err) {
				res.locals.error = '删除失败';
				return;
			}
			else{
				console.log(results.affectedRows);
				res.json(results);
			}
		});
	}
});

module.exports = router;