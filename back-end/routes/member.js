var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//사용자 목록
router.get('/list', function (req, res) {
    const key = req.query.key;
    const word = req.query.word;
    const size = parseInt(req.query.size);
    const page = parseInt(req.query.page);
    let sql = `select *,date_format(member_user_regDate,'%Y.%m.%d %T') as fmtdate, date_format(member_user_birth,'%Y.%m.%d') as fmtbirth from member_info where ${key} like '%${word}%' order by member_user_key desc limit ?,?`
    db.get().query(sql, [(page - 1) * size, size], function (err, rows) {
        if (err) {
            console.log('...........................................사용자목록 list', err)
            res.send({ result: 0 });
        } else {
            const documents = rows;
            sql = `select count(*) as total from member_info where ${key} like '%${word}%' `;
            db.get().query(sql, function (err, rows) {
                if (err) {
                    console.log('..............................................사용자목록 total', err)
                } else {
                    const count = rows[0].total;
                    res.send({ count, documents });
                }
            })
        }
    })
})

//사용자 등록
router.post('/insert', function (req, res) {
    const Member_user_uid = req.body.uid;
    const Member_user_name = req.body.name;
    const Member_user_password = req.body.password
    const Member_user_phone = req.body.phone;
    const Member_user_gender = req.body.gender;
    const Member_user_birth = req.body.birth;

    const sql = `insert into member_info (
        Member_user_uid,
        Member_user_name,
        Member_user_password,
        Member_user_phone,
        Member_user_gender,
        Member_user_birth
        ) values(?,?,?,?,?,?)`
    db.get().query(sql, [Member_user_uid, Member_user_name, Member_user_password, Member_user_phone, Member_user_gender, Member_user_birth], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자등록', err);
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//사용자 조회
router.get(`/user`, function (req, res) {
    const Member_user_uid = req.query.uid;
    let sql = `select *,date_format(member_user_regDate,'%Y.%m.%d %T') as fmtdate, date_format(member_user_birth,'%Y.%m.%d') as fmtbirth from member_info where member_user_uid=?`
    db.get().query(sql, [Member_user_uid], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자조회', err);
            res.send({ result: 0 });
        } else {
            res.send(rows[0]);
        }
    })
})

//사용자 데이터 수정
router.post(`/update`, function (req, res) {
    const Member_user_uid = req.body.uid;
    const Member_user_name = req.body.name;
    const Member_user_phone = req.body.phone;
    const Member_user_gender = req.body.gender;
    const Member_user_birth = req.body.birth;
    let sql = `UPDATE member_info SET 
                member_user_name=?, 
                member_user_phone=?, 
                member_user_gender=?, 
                member_user_birth=? 
                WHERE member_user_uid=?`;

    db.get().query(sql, [
        Member_user_name,
        Member_user_phone,
        Member_user_gender,
        Member_user_birth,
        Member_user_uid
    ], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자정보수정', err);
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//관리자용 사용자 조회
router.get(`/admin/user`, function (req, res) {
    const key = req.query.key;
    let sql = `select *,date_format(member_user_regDate,'%Y.%m.%d %T') as fmtdate, date_format(member_user_birth,'%Y.%m.%d') as fmtbirth from member_info where member_user_key=?`
    db.get().query(sql, [key], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자조회', err);
            res.send({ result: 0 });
        } else {
            res.send(rows[0]);
        }
    })
})

//관리자용 사용자 데이터 수정
router.post(`/admin/update`, function (req, res) {
    const uid = req.body.uid;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const birth = req.body.birth;
    const pass = req.body.pass;
    const auth = req.body.auth;
    const exp = req.body.exp;
    const grade =req.body.grade;
    let sql = `UPDATE member_info SET 
                member_user_name=?, 
                member_user_phone=?, 
                member_user_gender=?, 
                member_user_birth=?,
                member_user_password=?,
                member_user_auth=?,
                member_user_exp=?,
                member_user_grade=? 
                WHERE member_user_uid=?`;

    db.get().query(sql, [name,phone,gender,birth,pass,auth,exp,grade,uid], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자정보수정', err);
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//사용자 삭제
router.post('/delete', function (req, res) {
    const Member_user_key = req.body.key;
    let sql = `delete from member_info where Member_user_key=?`
    db.get().query(sql, [Member_user_key], function (err, rows) {
        if (err) {
            console.log('err......................................................사용자삭제', err);
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

router.post('/pass', function (req, res) {
    const pass = req.body.password;
    const uid = req.body.uid;
    let sql = `update member_info set member_user_password=? where member_user_uid=?`
    db.get().query(sql, [pass, uid], function (err, rows) {
        if (err) {
            console.log('err......................................................비밀번호변경', err);
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//로그인 라우터
router.post('/login', function (req, res) {
    const uid = req.body.uid;
    const password = req.body.password;
    let sql = "select * from member_info where member_user_uid=?"
    db.get().query(sql, [uid], function (err, rows) {
        if (err) {
            console.log('err......................................................로그인', err);
            res.send({ result: 0 });
        } else {
            const row = rows[0];
            let result = 0;
            if (row) {
                if (row.Member_user_password == password) {
                    result = 1;
                } else {
                    result = 2;
                }
            }
            res.send({ result });
        }
    })
})

module.exports = router;

