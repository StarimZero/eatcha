var express = require('express');
var router = express.Router();
var db = require("../db");



//메뉴를 저장하기
router.post("/insert", function(req, res){

    const restaurant_id = req.body.restaurant_id
    const menu_name =  req.body.menu_name
	const menu_price =  req.body.menu_price
	const menu_profile_photo = req.body.menu_profile_photo
	const menu_photo = req.body.menu_photo
  
    
    const sql = "insert into restaurant_info(restaurant_id, menu_name, menu_price,  menu_profile_photo, menu_photo) values(?,?,?,?,?) "


    db.get().query(sql, [restaurant_id, menu_name, menu_price,  menu_profile_photo, menu_photo], function(err, rows){
        if(err){
            console.log("메뉴저장하다가오류............................", err);
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    });
})



module.exports = router;
