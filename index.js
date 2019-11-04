const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
// const {Pool} = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('/', (req, res) => res.render('pages/index'));
// using sendFile until we conv main.html to index.ejs
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/main.html');
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
