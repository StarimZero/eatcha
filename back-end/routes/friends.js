var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//

//친구목록 리스트
router.get('/list',function(req,res){
    const Member_friends_uid = req.params.uid;
    let sql=`select * from member_friends where Member_friends_uid=?`
    db.get().query(sql,[Member_friends_uid],function(err,rows){
        if (err) {
            console.log('...........................................친구목록 list', err)
            res.send({result:0});
        } else {
            const doc = rows;
            sql = `select count(*) total from member_friends where ${key} like "%"${word}"%" `;
            db.get().query(sql, function (err, rows) {
                if (err) {
                    console.log('..............................................친구목록 total', err)
                    res.send({result:0});
                } else {
                    const count = rows[0].total;
                    res.send({ count, doc });
                }
            })
        }
    })
})

//친구 추가
router.post('/insert',function(req,res){
    const Member_friends_followid = req.body.followid;
    const Member_friends_uid = req.body.uid;
    let sql= `insert into member_friends(
            Member_friends_uid,
            Member_friends_followid,
            Member_friends_followdate
            ) values(?,?,now())`
    db.get().query(sql,[Member_friends_uid,Member_friends_followid],function(err,rows){
        if(err){
            console.log('..............................................친구추가', err)
            res.send({result:0});
          }else{
            res.send({result:1});
          }
    })
})

//친구 삭제
router.post('/delete',function(req,res){
    const Member_friends_fid = req.body.fid;
    let sql = `delete from Member_friends where Member_friends_fid = ?`
    db.get().query(sql,[Member_friends_fid],function(err,rows){
        if(err){
            console.log('..............................................친구삭제', err)
            res.send({result:0});
          }else{
            res.send({result:1});
          }
    })
})

module.exports = router;
