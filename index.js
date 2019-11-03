const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    //for register and login
    .post('/login',(req,res) => checklogin(res,req))
    .post('/register',(req,res) => createlogin(res,req))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function createlogin(req,res){
  pool.connect(function (isErr) {
      if (isErr) {
          console.log('connect error:' + isErr.message);
          client.end();
          return;
      }else{
          console.log('db connected');
                pool.query('select * from users',function(result){
                console.log(result.rows);

                pool.end();
                });
              }
      });
    }

function checklogin(req, res){
      pool.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            pool.end();
            return;
        }else{
          console.log('post login info');
          var queryinsert = `insert into Tokimon(name, weight, height, fly, fight, fire, water, electric, frozen, total, trainername) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
          const { name, weight, height, fly, fight, fire, water, electric, frozen, total, trainername } = req.body;
          //const added = new Date()
          console.log( {name, weight, height, fly, fight, fire, water, electric, frozen, total, trainername});//
          client.query(queryinsert,[name, weight, height, fly, fight, fire, water, electric, frozen, total, trainername], function (err){
            if(err){
              console.log(err);
              return;
            }else{
              res.redirect("/tokimon");
            }
          })
        }
      });
}
