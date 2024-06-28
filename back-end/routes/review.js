var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 식당 리뷰 리스트
router.get('/list/:restaurant_id', function(req, res) {
    const restaurant_id = req.params.restaurant_id;
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    let sql = "select r.*, m.member_user_name, ";
    sql += "date_format(r.review_regDate, '%Y년 %m월%d일 %T')as fmtDate, ";
    sql += "date_format(r.review_upDate, '%Y년 %m월%d일 %T')as fmtUpDate ";
    sql += "from review r, member_info m ";
    sql += "where restaurant_id=? and r.writer = m.member_user_uid ";
    sql += "order by review_regDate ";
    sql += "limit ?, ?";
    
    db.get().query(sql, [restaurant_id, (page-1)*size, size], function(err, rows) {
        const documents = rows;
        sql = "select count(*) total from review where restaurant_id=?";
        db.get().query(sql, [restaurant_id], function(err, rows){
            res.send({documents, total:rows[0].total});
        });
    });
});

// 식당 리뷰 등록
router.post('/insert', function(req, res) {
    const member_user_uid = req.body.member_user_uid;
    const restaurant_id = req.body.restaurant_id;
    const contents = req.body.contents;
    const rating = req.body.rating;
    let sql = 'insert into review(writer, contents, restaurant_id, rating) values(?, ?, ?, ?)';
    db.get().query(sql, [member_user_uid, contents, restaurant_id, rating], function(err, rows){
        if(err) {
            res.send({result:0});
        }else {
            res.send({result:1});
        }
    });
});

// 식당 리뷰 수정
router.post('/update', function(req, res) {
    const review_id = req.body.review_id;
    const contents = req.body.contents;
    const rating = req.body.rating;
    let sql = "update review set contents=?, rating=?, review_upDate=now()";
    sql += "where review_id=?";
    db.get().query(sql, [contents, rating, review_id], function(err, rows) {
        if(err) {
            res.send({result:0});
        }else {
            res.send({result:1});
        }
    });
});

// 식당 리뷰 삭제
router.post('/delete', function(req, res) {
    const review_id = req.body.review_id;
    let sql = "delete from review where review_id=?";
    db.get().query(sql, [review_id], function(err, rows) {
        if(err) {
            res.send({result:0});
        }else{
            res.send({result:1});
        }
    });
});

module.exports = router;
