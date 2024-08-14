var express = require('express');
var router = express.Router();
var db = require("../db");



//레스토랑을 저장하기
router.post("/insert", function (req, res) {

    const restaurant_name = req.body.restaurant_name;
    const restaurant_type = req.body.restaurant_type
    const restaurant_time = req.body.restaurant_time
    const restaurant_avgprice = req.body.restaurant_avgprice
    const restaurant_etcinfo = req.body.restaurant_etcinfo
    const restaurant_address1 = req.body.restaurant_address1
    const restaurant_address2 = req.body.restaurant_address2
    const restaurant_phone = req.body.restaurant_phone
    const restaurant_url = req.body.restaurant_url
    const restaurant_x = req.body.restaurant_x
    const restaurant_y = req.body.restaurant_y
    const restaurant_thumb= req.body.restaurant_thumb

    const sql = "insert into restaurant_info(restaurant_name, restaurant_type, restaurant_time,  restaurant_avgprice, restaurant_etcinfo,  restaurant_address1, restaurant_address2, restaurant_phone , restaurant_url , restaurant_x , restaurant_y, restaurant_thumb) values(?,?,?,?,?,?,?,?,?,?,?,?) "


    db.get().query(sql, [restaurant_name, restaurant_type, restaurant_time, restaurant_avgprice, restaurant_etcinfo, restaurant_address1, restaurant_address2, restaurant_phone, restaurant_url, restaurant_x, restaurant_y,restaurant_thumb], function (err, rows) {
        if (err) {
            console.log("레스토랑저장하다가오류............................", err);
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        }
    });
})

router.post(`/insert/photo`, function (req, res) {
    const restaurant_photos = req.body.urls; // 배열 형태로 URL들 받기

    if (!Array.isArray(restaurant_photos) || restaurant_photos.length === 0) {
        res.send({ result: 0, message: "유효하지 않은 데이터입니다." });
        return;
    }

    const sql1 = "SELECT LAST_INSERT_ID() AS last FROM restaurant_info";
    db.get().query(sql1, function (err, key) {
        if (err) {
            console.log("키 가져오다가 오류............................", err);
            res.send({ result: 0 });
            return;
        }
        const restaurant_id = key[0].last;

        // Insert each photo URL into the database
        const insertPromises = restaurant_photos.map(photo_url => {
            return new Promise((resolve, reject) => {
                const sql = "INSERT INTO restaurant_photo (restaurant_id, restaurant_photo) VALUES (?, ?)";
                db.get().query(sql, [restaurant_id, photo_url], function (err, rows) {
                    if (err) {
                        console.log("레스토랑사진 저장하다가 오류............................", err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
        // Wait for all insert operations to complete
        Promise.all(insertPromises)
            .then(() => res.send({ result: 1 }))
            .catch(() => res.send({ result: 0 }));
    });
});


//식당목록모기 테스트 : http://localhost:5000/restaurant/list
router.get("/list", function (req, res) {
    sql = "select * from restaurant_info order by restaurant_id desc"
    db.get().query(sql, function (err, rows) {
        if (err) {
            console.log("레스토랑 불러오다가 오류", err);
        } else {
            res.send(rows)
        }
    });
});


//식당정보 읽기
router.get('/read/:restaurant_id', function (req, res) {
    const restaurant_id = req.params.restaurant_id;

    const sql = "select * from restaurant_info where restaurant_id =?"
    db.get().query(sql, [restaurant_id], function (err, rows) {
        res.send(rows[0])
    })
})

//식당삭제하기
router.post('/delete/:restaurant_id', function (req, res) {
    const restaurant_id = req.params.restaurant_id;
    const sql = "delete from restaurant_info where restaurant_id=?"
    db.get().query(sql, [restaurant_id], function (err, rows) {
        if (err) {
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        }
    })
})

//식당수정하기
router.post(`/update`, function (req, res) {
    const restaurant_id = req.body.restaurant_id;
    const restaurant_name = req.body.restaurant_name
    const restaurant_type = req.body.restaurant_type
    const restaurant_time = req.body.restaurant_time
    const restaurant_avgprice = req.body.restaurant_avgprice
    const restaurant_etcinfo = req.body.restaurant_etcinfo
    const restaurant_address1 = req.body.restaurant_address1
    const restaurant_address2 = req.body.restaurant_address2
    const restaurant_phone = req.body.restaurant_phone
    const restaurant_url = req.body.restaurant_url
    const restaurant_x = req.body.restaurant_x
    const restaurant_y = req.body.restaurant_y
    const sql = "update restaurant_info set restaurant_name=?, restaurant_type = ?, restaurant_time = ?, restaurant_avgprice =?, restaurant_etcinfo =?, restaurant_address1 =?, restaurant_address2=?, restaurant_phone=?, restaurant_url=?, restaurant_x =?, restaurant_y=? where restaurant_id=?"
    db.get().query(sql, [restaurant_name, restaurant_type, restaurant_time, restaurant_avgprice, restaurant_etcinfo, restaurant_address1, restaurant_address2, restaurant_phone, restaurant_url, restaurant_x, restaurant_y, restaurant_id], function (err, rows) {
        if (err) {
            console.log("식당정보수정하다가오류입니다.......", err)
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        }
    })
})

router.post('/update/photo',function(req,res){
    const restaurant_photo_id=req.body.restaurant_photo_id
    const restaurant_photo=req.body.restaurant_photo
    const sql='update restaurant_photo set restaurant_photo=? where restaurant_photo_id=?'
    db.get().query(sql,[restaurant_photo,restaurant_photo_id],function(err,row){
        if (err) {
            console.log("식당사진수정하다가오류입니다.......", err)
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        } 
    })
})

router.post('/update/thumb',function(req,res){
    const restaurant_id=req.body.restaurant_id
    const restaurant_thumb=req.body.restaurant_thumb
    const sql='update restaurant_info set restaurant_thumb=? where restaurant_id=?'
    db.get().query(sql,[restaurant_thumb,restaurant_id],function(err,row){
        if (err) {
            console.log("식당썸네일수정하다가오류입니다.......", err)
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        } 
    })
})

module.exports = router;
