const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// //////////////////
// Lang: Have set conncetion on db inside function
// lang local test
var pg = require('pg');
var conString = "tcp://postgres:00012345@localhost:5432/bobbybreakout"; //tcp://用户名：密码@localhost/数据库名
///////////////////



const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.render('pages/index'));
// using sendFile until we conv main.html to index.ejs
app.get('/', function(req, res) {
  res.sendFile(path.join(path.join(__dirname, 'public'), 'login.html'));
});
app.post('/login', (req, res) => checklogin(req, res));
app.post('/register', (req, res) => createlogin(req, res));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function createlogin(req, res) {
  console.log('post login info');

  const pool = new pg.Client(conString);
  pool.connect(function(isErr) {
    if (isErr) {
      console.log('connect error:' + isErr.message);
      client.end();
      return;
    } else { // connected
      console.log('db connected');
      const {uname, psw, mgw} = req.body; // get register form loginform
      const querycheck = `SELECT password FROM users WHERE username=$1 `;
      pool.query(querycheck, [uname], function(err, result) {
        if (err) {
          console.log(err);
          pool.end();
          return;
        } else { // query success
          if (result.rows.length<1 ) {
            console.log(' account is not used, creatable!');
            let premiumcheck = false;
            if (mgw === 'bobby') {
              premiumcheck = true;
            }
            const querycreate = `INSERT into users(username, password, premium) values($1, $2, $3)`;
            pool.query(querycreate, [uname, psw, premiumcheck], function(err, result) {
              if (err) {
                console.log(err + 'fail to create');
              } else {
                console.log('acct created');
                res.status(200).redirect('/login.html');
              }
            });
          } else { // wrong psw
            console.log(' account taken!');
            res.status(405).redirect('back');
          }
        }
      });
    }
  });
}

function checklogin(req, res) {
  console.log('post login info');

  const pool = new pg.Client(conString);
  pool.connect(function(isErr) {
    if (isErr) {
      console.log('connect error:' + isErr.message);
      pool.end();
      return;
    } else { // connected
      console.log('db connected');
      const {loginuname, loginpsw} = req.body; // get login form loginform
      const querycheck = `SELECT password, premium FROM users WHERE username=$1 `;
      // console.log( {username , password , premium } );//
      pool.query(querycheck, [loginuname], function(err, result) {
        if (err) {
          console.log(err);
          return;
        } else { // query success
          if (result.rows.length<1 ) {
            console.log('password incorrect or account not exist!');
            res.status(404).redirect('back');
          } else if (result.rows[0].password === loginpsw) { // account exist and psw correct
            console.log(result.rows[0].premium);
            if (result.rows[0].premium) {
              res.status(200).redirect('/main.html?premium=true');
            } else {
              res.status(200).redirect('/main.html?premium=false');
            }
          } else { // wrong psw
            console.log('password incorrect or account not exist!');
            res.status(405).redirect('back');
          }
        }
      });
    }


  //  res.send(req.body);
  });
  return;
}

