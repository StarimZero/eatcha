var mysql=require('mysql');
var config={
    connectionLimit:100,
    host:'kosmo.clq6suy4a7c3.ap-northeast-2.rds.amazonaws.com',   // 혹은 127.0.0.1
    user:'eatcha',
    password:'pass',
    database:'eatchadb',
    port:'3306'
};

var pool=mysql.createPool(config);
var connection;

exports.connect = function(){
    pool.getConnection(function(err, con){
        if(err){
            console.log('db접속 오류:', err);
        }else{
            connection=con;
            console.log('접속성공');
        }
    });
}

exports.get = function(){
    return connection;
}