var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//뱃지 목록
router.get('/list',function(req,res){
    const Member_user_uid = req.params.uid;
    let sql = `select * from member_badge where Member_user_uid=?`
    db.get().query(sql,[Member_user_uid],function(err,rows){
        if (err) {
            console.log('...........................................뱃지목록 list', err)
            res.send({result:0});
        } else {
            const doc = rows;
            sql = `select count(*) total from member_badge where ${key} like "%"${word}"%" `;
            db.get().query(sql, function (err, rows) {
                if (err) {
                    console.log('..............................................뱃지목록 total', err)
                    res.send({result:0});
                } else {
                    const count = rows[0].total;
                    res.send({ count, doc });
                }
            })
        }
    })
})

//뱃지추가
router.post('/insert',function(req,res){
    const Member_badge_name= parseInt(req.body.name);
    const Member_badge_qnt =parseInt(req.body.qnt);
    const Member_user_uid= req.body.uid;
    let sql= `insert into member_badge (
            Member_badge_name,
            Member_badge_qnt,
            Member_user_uid,
            ) values(?,?,?)`
     db.get().query(sql,[Member_badge_name,Member_badge_qnt,Member_user_uid],function(err,rows){
        if (err) {
            console.log('..............................................뱃지추가', err)
            res.send({result:0});
        } else {
            res.send({result:1});
        }
     })        
})

//뱃지삭제
router.post('/delete',function(req,res){
    const Member_badge_bid = req.body.bid;
    let sql=`delete from Member_badge where bid=?`
    db.get().query(sql,[Member_badge_bid],function(err,rows){
        if (err) {
            console.log('..............................................뱃지삭제', err)
            res.send({result:0});
        } else {
            res.send({result:1});
        }
    })
})

//뱃지수정
router.post('/update',function(req,res){
    const Member_badge_name= parseInt(req.body.name);
    const Member_badge_qnt = parseInt(req.body.qnt);
    const Member_user_uid= req.body.uid;
    let sql=`update member_badge set 
    (Member_badge_name=?,
    Member_badge_qnt=?)
    where Member_user_uid=?`
    db.get().query(sql,[Member_badge_name,Member_badge_qnt,Member_user_uid],function(err,rows){
        if (err) {
            console.log('..............................................뱃지수정', err)
            res.send({result:0});
        } else {
            res.send({result:1});
        }
    })
})
module.exports = router;
