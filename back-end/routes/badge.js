var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
//뱃지 목록
router.get('/list', function (req, res) {
    let sql = 'select * from badge_info'
    db.get().query(sql, function (err, rows) {
        if (err) {
            console.log('...........................................뱃지목록 list', err)
            res.send({ result: 0 });
        } else {
            res.send(rows)
        }
    })
})

//뱃지등록
router.post('/insert', function (req, res) {
    const img = req.body.badge_img
    const name = req.body.badge_name
    const text = req.body.badge_text
    const req2 = req.body.badge_req
    let sql = `insert into badge_info (badge_img,badge_name,badge_text,badge_req) values(?,?,?,?)`
    db.get().query(sql, [img, name, text, req2], function (err, rows) {
        if (err) {
            console.log('..............................................뱃지추가', err)
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})
//뱃지 읽기
router.get(`/read/:key`, function (req, res) {
    const key = req.params.key;
    console.log(key)
    let sql = `select * from badge_info where badge_key=?`
    db.get().query(sql, [key], function (err, rows) {
        if (err) {
            console.log('..............................................뱃지읽기', err)
            res.send({ result: 0 });
        } else {
            res.send(rows[0])
        }
    })
})

//뱃지삭제
router.post('/delete', function (req, res) {
    const Member_badge_key = parseInt(req.body.key);
    const Member_user_uid = req.body.uid;
    let sql = `delete from Member_badge where Member_badge_key=? and Member_user_uid=? `
    db.get().query(sql, [Member_badge_key, Member_user_uid], function (err, rows) {
        if (err) {
            console.log('..............................................뱃지삭제', err)
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

//개인뱃지리스트
router.get('/list/:uid', function (req, res) {
    const uid = req.params.uid;
    console.log(uid)
    let sql = 'select bdg.* , bif.* from member_badge bdg join badge_info bif on badge_key= member_badge_key where member_user_uid=?'
    db.get().query(sql, [uid], function (err, rows) {
        if (err) {
            console.log('...........................................개인 뱃지목록 list', err)
            res.send({ result: 0 });
        } else {
            res.send(rows)
        }
    })
})

//뱃지수정
router.post(`/update/`, function (req, res) {
    const img = req.body.badge_img
    const key = req.body.badge_key
    const name = req.body.badge_name
    const req2 = req.body.badge_req
    const text = req.body.badge_text
    const sql = `update badge_info set badge_name=?, badge_img=? ,badge_req=?,badge_text=? where badge_key=?`
    db.get().query(sql, [name, img, req2, text, key], function (err, rows) {
        if (err) {
            console.log('..............................................뱃지수정', err)
            res.send({ result: 0 });
        } else {
            res.send({ result: 1 });
        }
    })
})

// 뱃지 추가 함수1
const checkAndAwardBadge = async (uid) => {
    const sql = 'SELECT COUNT(*) AS total FROM review WHERE writer=?';
    db.get().query(sql, [uid], function (err, rows) {
        if (err) {
            console.log('리뷰 조회 오류:', err);
        } else {
            const reviewCount = rows[0].total;
            let badgeKey;

            // 리뷰 수에 따른 뱃지 설정
            switch (true) {
                case (reviewCount >= 30):
                    badgeKey = 4;
                    break;
                case (reviewCount >= 20):
                    badgeKey = 3;
                    break;
                case (reviewCount >= 10):
                    badgeKey = 2;
                    break;
                case (reviewCount >= 1):
                    badgeKey = 1;
                    break;
                default:
                    console.log('리뷰 수가 부족합니다.');
            }
            // 뱃지 중복 확인
            const badgeChk = 'SELECT * FROM member_badge WHERE member_user_uid=? AND member_badge_key=?';
            db.get().query(badgeChk, [uid, badgeKey], function (err, result) {
                if (err) {
                    console.log('뱃지 조회 오류:', err);
                }

                if (result.length > 0) {
                    console.log('이미 뱃지가 존재합니다1:', badgeKey);
                    return; // 이미 뱃지가 존재하는 경우 조기에 반환
                }
                // 뱃지 등록
                const badgeInsert = 'INSERT INTO member_badge (member_user_uid, member_badge_key) VALUES (?, ?)';
                db.get().query(badgeInsert, [uid, badgeKey], function (err, row) {
                    if (err) {
                        console.log('뱃지 등록 오류1:', err);
                    } else {
                        console.log('뱃지 등록 완료:', badgeKey);
                    }
                });
            });
        }
    });
}
// 뱃지 추가 함수2
const checkAndAwardBadge2 = async (uid, type) => {
    const sql = `SELECT COUNT(*) AS total 
    FROM review r 
    join restaurant_info i 
    on r.restaurant_id=i.restaurant_id 
    WHERE r.writer=? and i.restaurant_type=?`;
    db.get().query(sql, [uid, type], function (err, rows) {
        if (err) {
            console.log('리뷰 조회 오류:', err);
        } else {
            const reviewCount = rows[0].total;
            let badgeKey;

            // 타입에 따른 뱃지 설정
            switch (type) {
                case 1:
                    if (reviewCount >= 10) {
                        badgeKey = 5;//한식마니아
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 2:
                    if (reviewCount >= 10) {
                        badgeKey = 6; //메이드인 차이나
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 3:
                    if (reviewCount >= 10) {
                        badgeKey = 20; //일식덕후
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 4:
                    if (reviewCount >= 10) {
                        badgeKey = 9;// 아이러브 파스타
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 5:
                    if (reviewCount >= 1) {
                        badgeKey = 10; // 베트남 쌀국수 여행
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 6:
                    if (reviewCount >= 10) {
                        badgeKey = 11; //밥 보단 빵
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 7:
                    if (reviewCount >= 10) {
                        badgeKey = 24; //카페인 수혈중
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 8:
                    if (reviewCount >= 10) {
                        badgeKey = 15; //버거대왕
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                case 9:
                    if (reviewCount >= 1) {
                        badgeKey = 8; //구내식당 청소기
                    } else {
                        console.log('리뷰 수가 부족합니다.');
                    }
                    break;
                default:
                    console.log('유효하지 않은 유형입니다.');
            }

            if (!badgeKey) {
                console.log('조건을 만족하는 뱃지 키가 설정되지 않았습니다.');
                return; // badgeKey가 설정되지 않은 경우 조기에 반환
            }

            // 뱃지 중복 확인
            const badgeChk = 'SELECT * FROM member_badge WHERE member_user_uid=? AND member_badge_key=?';
            db.get().query(badgeChk, [uid, badgeKey], function (err, result) {
                if (err) {
                    console.log('뱃지 조회 오류:', err);
                }

                if (result.length > 0) {
                    console.log('이미 뱃지가 존재합니다2:', badgeKey);
                    return; // 이미 뱃지가 존재하는 경우 조기에 반환
                }
                // 뱃지 등록
                const badgeInsert = 'INSERT INTO member_badge (member_user_uid, member_badge_key) VALUES (?, ?)';
                db.get().query(badgeInsert, [uid, badgeKey], function (err, row) {
                    if (err) {
                        console.log('뱃지 등록 오류2:', err);
                    } else {
                        console.log('뱃지 등록 완료:', badgeKey);
                    }
                });
            });
        }
    });
}

// 뱃지 추가 함수3
const checkAndAwardBadge3 = async (uid, category) => {
    const sql = `SELECT COUNT(*) AS total 
    FROM review r 
    JOIN restaurant_info i 
    ON r.restaurant_id=i.restaurant_id 
    WHERE r.writer=? AND i.restaurant_category=?`;

    db.get().query(sql, [uid, category], function (err, rows) {
        if (err) {
            console.log('리뷰 조회 오류:', err);
            return; // 에러 발생 시 조기에 반환
        }

        const reviewCount = rows[0].total;
        let badgeKey;

        // 카테고리에 따라 뱃지 설정
        switch (category) {
            case 1: // 고기마니아
                if (reviewCount >= 10) {
                    badgeKey = 17;
                }
                break;
            case 2: // 바다의 왕자
                if (reviewCount >= 10) {
                    badgeKey = 21;
                }
                break;
            case 3: // 채식주의자
                if (reviewCount >= 10) {
                    badgeKey = 14;
                }
                break;
            case 4: // 든든 국밥
                if (reviewCount >= 10) {
                    badgeKey = 7;
                }
                break;
            case 5: // 후루룩 인생
                if (reviewCount >= 10) {
                    badgeKey = 22;
                }
                break;
            case 6: // 달콤한 인생
                if (reviewCount >= 10) {
                    badgeKey = 23;
                }
                break;
            case 7: // 달콤한 인생
                if (reviewCount >= 10) {
                    badgeKey = 25;
                }
                break;
            case 10: // 돈까스 킬러
                if (reviewCount >= 5) {
                    badgeKey = 12;
                }
                break;
            default:
                console.log('유효하지 않은 카테고리입니다.');
                return; // 유효하지 않은 카테고리인 경우 조기에 반환
        }

        if (!badgeKey) {
            console.log('조건을 만족하는 뱃지 키가 설정되지 않았습니다.');
            return; // badgeKey가 설정되지 않은 경우 조기에 반환
        }

        // 뱃지 중복 확인
        const badgeChk = 'SELECT * FROM member_badge WHERE member_user_uid=? AND member_badge_key=?';
        db.get().query(badgeChk, [uid, badgeKey], function (err, result) {
            if (err) {
                console.log('뱃지 조회 오류:', err);
                return; // 에러 발생 시 조기에 반환
            }

            if (result.length == 0) {
                // 뱃지 등록
                const badgeInsert = 'INSERT INTO member_badge (member_user_uid, member_badge_key) VALUES (?, ?)';
                db.get().query(badgeInsert, [uid, badgeKey], function (err, row) {
                    if (err) {
                        console.log('뱃지 등록 오류3:', err);
                    } else {
                        console.log('뱃지 등록 완료:', badgeKey);
                    }
                });
            } else {
                console.log('이미 뱃지가 존재합니다3:', badgeKey);
                return; // 이미 뱃지가 존재하는 경우 조기에 반환
            }
        });
    });
}

module.exports = { checkAndAwardBadge, checkAndAwardBadge2, checkAndAwardBadge3 };
module.exports = router;
module.exports.checkAndAwardBadge = checkAndAwardBadge;
module.exports.checkAndAwardBadge2 = checkAndAwardBadge2;
module.exports.checkAndAwardBadge3 = checkAndAwardBadge3;