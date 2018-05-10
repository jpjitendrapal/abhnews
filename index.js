const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var conObj = {
    host: process.env.abhnewsdbhost,
    user: process.env.abhnewsdbuser.split(":")[0],
    password: process.env.abhnewsdbuser.split(":")[1],
    database: process.env.abhnewsdb
};

var app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/home/home'))
app.get('/admin', (req, res) => res.render('admin/home/home'))
app.post('/getadmin',function(req, res){
    var con = mysql.createConnection(conObj);
    con.connect(function (err) {
      if (err) {
          console.log("Error");
          throw err
      };
      con.query('SELECT * from admin', function (err, rowsData, fields) {
          if (!err){
              res.status(200).json(rowsData);
          }
          else {
              res.json({error: "not able to connect"});
          }
              
      });
      // con.end();
  });
      //res.status(200).json({msg: "Hello"});
  });

  app.get('/getnews', (req, res) => {
    var con = mysql.createConnection(conObj);
      con.connect(function (err) {
        if (err) {
            console.log("Error");
            throw err
        };
        con.query('SELECT * from admin', function (err, rowsData, fields) {
            if (!err){
                res.status(200).json(rowsData);
            }
            else {
                res.json({error: "not able to connect"});
            }
                
        });
        // con.end();
    });
  });
  

  app.use(cookieParser());
  app.use(session({secret: "Shh, its a secret!"}));
  
  app.get('/check', function(req, res){
     if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
  });



  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



  
  