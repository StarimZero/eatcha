var express = require('express');
var router = express.Router();
var db = require("../db");



//레스토랑을 저장하기
router.post("/insert", function(req, res){

    const restaurant_name = req.body.restaurant_name;
    const restaurant_type =  req.body.restaurant_type
	const restaurant_time =  req.body.restaurant_time
	const restaurant_avgprice = req.body.restaurant_avgprice
	const restaurant_etcinfo = req.body.restaurant_etcinfo
    const restaurant_address1 = req.body.restaurant_address1
    const restaurant_address2 = req.body.restaurant_address2
    const restaurant_phone = req.body.restaurant_phone
    const restaurant_url = req.body.restaurant_url
    const restaurant_x = req.body.restaurant_x
    const restaurant_y = req.body.restaurant_y
    
    const sql = "insert into restaurant_info(restaurant_name, restaurant_type, restaurant_time,  restaurant_avgprice, restaurant_etcinfo,  restaurant_address1, restaurant_address2, restaurant_phone , restaurant_url , restaurant_x , restaurant_y) values(?,?,?,?,?,?,?,?,?,?,?) "


    db.get().query(sql, [restaurant_name, restaurant_type, restaurant_time,  restaurant_avgprice, restaurant_etcinfo,  restaurant_address1, restaurant_address2, restaurant_phone, restaurant_url, restaurant_x, restaurant_y], function(err, rows){
        if(err){
            console.log("레스토랑저장하다가오류............................", err);
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    });
})



//식당목록모기 테스트 : http://localhost:5000/restaurant/list
router.get("/list", function(req,res){
    sql = "select * from restaurant_info order by restaurant_id desc"
    db.get().query(sql, function(err, rows){
        if(err){
            console.log("레스토랑 불러오다가 오류", err);
        }else{
            res.send(rows)
        }
    });
});


//식당정보 읽기
router.get('/read/:restaurant_id', function(req,res){
    const restaurant_id = req.params.restaurant_id;

    const sql = "select * from restaurant_info where restaurant_id =?"
    db.get().query(sql, [restaurant_id], function(err, rows){
        res.send(rows[0])
    })
})

//식당삭제하기
router.post('/delete/:restaurant_id', function(req, res){
    const restaurant_id = req.params.restaurant_id;
    const sql = "delete from restaurant_info where restaurant_id=?"
    db.get().query(sql, [restaurant_id], function(err, rows){
        if(err){
            res.send({result:0})
        }else{
            res.send({result:1})
        }
    })
})

module.exports = router;
