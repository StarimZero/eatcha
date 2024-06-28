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
  
    
    const sql = "insert into restaurant_menu(restaurant_id, menu_name, menu_price, menu_profile_photo, menu_photo) values(?,?,?,?,?) "


    db.get().query(sql, [restaurant_id, menu_name, menu_price,  menu_profile_photo, menu_photo], function(err, rows){
        if(err){
            console.log("메뉴저장하다가오류............................", err);
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    });
})

//메뉴리스트 출력하기 
router.get("/list/:restaurant_id", function(req,res){
    const restaurant_id = req.params.restaurant_id;
    sql = "select * from restaurant_menu where restaurant_id=?"
    db.get().query(sql, [restaurant_id], function(err, rows){
        if(err){
            console.log("레스토랑 불러오다가 오류", err);
        }else{
            res.send(rows)
        }
    });
});

//메뉴 수정하기
router.post("/update", function(req, res){
    const menu_id = req.body.menu_id
    const menu_name =  req.body.menu_name
	const menu_price =  req.body.menu_price
	const menu_profile_photo = req.body.menu_profile_photo
	const menu_photo = req.body.menu_photo
    
    const sql = "update restaurant_menu set menu_name=?, menu_price=?, menu_profile_photo=?, menu_photo=? where menu_id=?"
    db.get().query(sql, [menu_name, menu_price, menu_profile_photo, menu_photo, menu_id], function(err, rows){
        if(err){
            console.log("메뉴수정하다가오류 ", err)
            res.send({result:0})
        }else{
            res.send({result:1});
        }
    })
})

//메뉴삭제하기
router.post('/delete', function(req, res){
    const menu_id = req.body.menu_id;
    const sql = "delete from restaurant_menu where menu_id=?"
    db.get().query(sql, [menu_id], function(err, rows){
        if(err){
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    })
})

module.exports = router;
