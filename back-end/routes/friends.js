var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
//

//관리자용 전체친구목록 리스트
router.get('/admin/list', function (req, res) {
    let sql = `select f.*, member_user_name ,date_format(member_friends_followdate,'%Y.%m.%d %T') as fmtdate 
    from member_friends f ,member_info i 
    where f.member_friends_uid=i.member_user_uid 
    order by f.member_friends_fid desc`
    db.get().query(sql, function (err, rows) {
        if (err) {
            console.log('..............................................관리자용친구목록', err)
            res.send({ result: 0 });
        } else {
            res.send(rows);
        }
    })
})

//내가 등록한 친구목록 리스트
router.get('/listFromMe', function (req, res) {
    const Member_friends_uid = req.query.uid;
    const key = req.query.key;
    const word = req.query.word;
    const searchCondition = key && word ? ` and ${key} like ?` : '';
    // 첫 번째 쿼리: 친구 목록 가져오기
    let sql = `
     select f.*, member_user_name, date_format(member_friends_followdate, '%Y.%m.%d %T') as fmtdate 
     from member_friends f, member_info i
     where (f.member_friends_followid = i.member_user_uid) and Member_friends_uid=?${searchCondition}`;

    db.get().query(sql, [Member_friends_uid, `%${word}%`], function (err, rows) {
        if (err) {
            console.log('...........................................친구목록 list', err);
            res.send({ result: 0 });
        } else {
            const doc = rows;
            // 두 번째 쿼리: 검색된 친구 수 가져오기
            sql = `select count(*) as total from member_friends where Member_friends_uid=?${searchCondition}`;
            db.get().query(sql, [Member_friends_uid, `%${word}%`], function (err, rows) {
                if (err) {
                    console.log('..............................................친구목록 total', err);
                    res.send({ result: 0 });
                } else {
                    const count = rows[0].total;
                    res.send({ count, doc });
                }
            });
        }
    });
});

//나를 등록한 친구 리스트
router.get('/listToMe', function (req, res) {
    const Member_friends_uid = req.query.uid;
    const key = req.query.key;
    const word = req.query.word;
    const searchCondition = key && word ? ` and ${key} like ?` : '';
    // 첫 번째 쿼리: 친구 목록 가져오기
    let sql = `
     select f.*, member_user_name, date_format(member_friends_followdate, '%Y.%m.%d %T') as fmtdate 
     from member_friends f, member_info i
     where (f.member_friends_uid = i.member_user_uid) and Member_friends_followid=?${searchCondition}`;
    db.get().query(sql, [Member_friends_uid, `%${word}%`], function (err, rows) {
        if (err) {
            console.log('...........................................나를등록한친구목록 list', err);
            res.send({ result: 0 });
        } else {
            const doc = rows;
            // 두 번째 쿼리: 검색된 친구 수 가져오기
            sql = `select count(*) as total from member_friends where Member_friends_followid=?${searchCondition}`;

            db.get().query(sql, [Member_friends_uid, `%${word}%`], function (err, rows) {
                if (err) {
                    console.log('..............................................친구목록 total', err);
                    res.send({ result: 0 });
                } else {
                    const count = rows[0].total;
                    res.send({ count, doc });
                }
            });
        }
    });
});

//친구 추가
router.post('/insert', function (req, res) {
    const Member_friends_followid = req.body.followid;
    const Member_friends_uid = req.body.uid;
    let sql = `insert into member_friends(
            Member_friends_uid,
            Member_friends_followid,
            Member_friends_followdate
            ) values(?,?,now())`
    db.get().query(sql, [Member_friends_uid, Member_friends_followid], function (err, rows) {
        if (err) {
            console.log('..............................................친구추가', err)
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//친구 삭제
router.post('/delete', function (req, res) {
    const Member_friends_fid = req.body.fid;
    let sql = `delete from member_friends where member_friends_fid=?`
    db.get().query(sql, [Member_friends_fid], function (err, rows) {
        if (err) {
            console.log('..............................................친구삭제', err)
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

module.exports = router;
