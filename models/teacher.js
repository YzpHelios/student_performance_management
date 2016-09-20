/*
*教师模块
*@author: yuanzp
*@date:   2016/9/15
*/

var mysql = require('mysql'),
	pool = require('./db.js'),
	DB_NAME = 'student_performance_management';

function Teacher(teacher) {
	this.tNo = teacher.tNo;
	this.tName = teacher.tName;
	this.tBirthday = teacher.tBirthday;
	this.tSex = teacher.tSex;
	this.tPhone = teacher.tPhone;
	this.E_mail = teacher.E_mail;
};
module.exports = Teacher;

pool.getConnection(function(err,connection){
	/*添加老师*/
	Teacher.prototype.save = function save(callback) {
		var teacher = {
			tNo: 		this.tNo,
			tName: 		this.tName,
			tBirthday: 	this.tBirthday,
			tSex: 		this.tSex,
			tPhone: 	this.tPhone,
			E_mail: 	this.E_mail
		};

		var insertTeacher_Sql = "INSERT INTO teacher(tNo,tName,tBirthday,tSex,tPhone,E_mail) VALUES(?,?,?,?,?,?)";
		connection.query(insertTeacher_Sql,[teacher.tNo,teacher.tName,teacher.tBirthday,teacher.tSex,teacher.tPhone,teacher.E_mail],function(err,result){
			if (err) {
				console.log("insertTeacher_Sql Error:" + err.message);
				return;
			}
			
			console.log("添加老师成功");
			callback(err,result);
		});
	};

	Teacher.getTeacherNumByTNO = function getTeacherNumByTNO(tNo,callback) {
		var getTeacherNumByTNO_Sql = "SELECT COUNT(1) AS num FROM teacher WHERE tNo = ?";

		connection.query(getTeacherNumByTNO_Sql,[tNo],function(err,result){
			if (err) {
				console.log("getTeacherNumByTNO_Sql Erroe:" + er.message);
				return;
			}

			console.log("查询老师人数成功");
			callback(err,result);
		});
	};

	 Teacher.getTeacherByTNO = function getTeacherByTNO(tNo,callback) {
	 	var getTeacherByTNO_Sql = "SELECT * FROM teacher WHERE tNo = ? ";

	 	connection.query(getTeacherByTNO_Sql,[tNo],function(err,result){
	 		if (err) {
	 			console.log("getTeacherByTNO_Sql Error:" + err.message);
	 			return;
	 		}
	 		console.log("获取老师信息成功");
	 		callback(err,result);
	 	});
	 };

	//根据教师编号或教师姓名查找教师
	Teacher.getTeacherByTnoTname = function getTeacherByTnoTname(tNo,callback){
		var getTeacherByTnoTname_Sql = "SELECT * FROM teacher WHERE tNo= ?";

		connection.query(getTeacherByTnoTname_Sql,[tNo],function(err,result){
			if (err) {
				console.log("getTeacherByTnoTname_Sql Error:" + err.message);
				return;
			}
			console.log("跟据教师编号或姓名查找教师成功");
			callback(err,result);
		});
	};

	Teacher.delTeacher = function delTeacher(tNo,callback){
		var delTeacher_Sql = "DELETE FROM teacher WHERE tNo =?";
		connection.query(delTeacher_Sql,[tNo],function(err,result){
			if (err) {
				console.log("delTeacher_Sql Error:" + err.message);
				return;
			}
			console.log("删除该老师记录");
			callback(err,result);
		});
	};

});
