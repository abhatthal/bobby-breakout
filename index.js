const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const {Pool} = require('pg');

////////////////////
// Lang: Have set conncetion on db inside function
// lang local test
var pg = require('pg');
var conString = "tcp://postgres:00012345@localhost:5432/tokimon"; //tcp://用户名：密码@localhost/数据库名
///////////////////

//const pool =  new pg.Client(conString);

/*
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
*/

const bodyParser = require("body-parser");

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended: false }))     //.urlencoded()
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    //for register and login
    .post('/login',(req,res) => checklogin(req,res))
    .post('/register',(req,res) => createlogin(req,res))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function createlogin(req,res){
  console.log('post login info');

  const pool =  new pg.Client(conString);
  pool.connect(function (isErr) {
      if (isErr) {
          console.log('connect error:' + isErr.message);
          client.end();
          return;
      }else{   // connected
          console.log('db connected');
          const {uname,psw, mgw} = req.body;   // get register form loginform
          var querycheck = `SELECT password FROM users WHERE username=$1 ` ;
          pool.query(querycheck,[uname],function(err,result){
            if(err){
              console.log(err);
              pool.end();
              return;
            }else{  //query success
              if(result.rows.length<1 ){
                console.log(" account is not used, creatable!");
                var premiumcheck = false;
                if([mgw] === 'bobby'){
                  premiumcheck = true;
                }
                var querycreate = `INSERT into users(username, password, premium) values($1, $2, $3)` ;
                pool.query(querycreate,[uname, psw, premiumcheck], function (err, result){
                  if(err){
                    console.log(err + 'fail to create');
                  }else{
                    console.log('acct created');
                    res.status(200).redirect('/login.html');
                  }
                });
              }else{    // wrong psw
                console.log(" account taken!");
                res.status(405).redirect('back');
              }
            }
          });
      }
    });

}

function checklogin(req, res){
    console.log('post login info');

    const pool =  new pg.Client(conString);
    pool.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            pool.end();
            return;
        }else{    // connected
          console.log('db connected');
          const {loginuname,loginpsw} = req.body;   // get login form loginform
          var querycheck = `SELECT password FROM users WHERE username=$1 ` ;
          //console.log( {username , password , premium } );//
          pool.query(querycheck,[loginuname], function (err, result){
            if(err){
              console.log(err);
              return;
            }else{   //query success
              if(result.rows.length<1 ){
                console.log("password incorrect or account not exist!");
                res.status(404).redirect('back');
              }
              //console.log(result.rows);
              else if(result.rows[0].password === loginpsw){  // account exist and psw correct
                res.status(200).redirect("/bb-test.html");
              }else{    // wrong psw
                console.log("password incorrect or account not exist!");
                res.status(405).redirect('back');
              }
            }
          });
        }


  //  res.send(req.body);
    });
    return;
}
