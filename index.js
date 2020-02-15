const mysql      = require('mysql');
const express      = require('express');
const body      = require('body-parser');
const multer = require('multer');

const app = express();

// parse application/json
app.use(body.json());

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()  + ".png");
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'evoting'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            throw err;
        }
        res.end(req.file.filename + " File is uploaded");
    });
});


//show all products
app.get('/api/city',(req, res) => {
  let sql = "SELECT * FROM city";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/city_name',(req, res) => {

  let sql = "SELECT * FROM city where CTname = ? and Sid = ?";
  let query = conn.query(sql,[req.body.CTname,req.body.Sid],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/voter_signup',(req, res) => {

  let sql = "INSERT INTO voter(Vname,Vemail,Vph,Vaddress,Vcity,Vstate,Vpassword,Vdob,Vphoto) values (?,?,?,?,?,?,?,?,?)";
  let query = conn.query(sql,[req.body.Vname,req.body.Vemail,req.body.Vph,req.body.Vaddress,req.body.Vcity,req.body.Vstate,req.body.Vpassword,req.body.Vdob,req.body.Vphoto
],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200,"message":"Signup Succesfull.", "error": null, "response": results}));
  });
});


app.post('/api/voter_login',(req, res) => {

  let sql = "Select * from voter where Vph = ? AND Vpassword = ? ORDER BY Vid DESC LIMIT 1";
  let query = conn.query(sql,[req.body.Vph,req.body.Vpassword],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200,"message":"Login Succesfull.", "error": null, "response": results}));
  });
});


app.post('/api/candidate_signup',(req, res) => {

  let sql = "INSERT INTO candidate(Cname,Cemail,Cph,Caddress,Ccity,Cstate,Cpassword,Cdob,Cstatus,Cphoto) values (?,?,?,?,?,?,?,?,?,?)";
  let query = conn.query(sql,[req.body.Cname,req.body.Cemail,req.body.Cph,req.body.Caddress,req.body.Ccity,req.body.Cstate,req.body.Cpassword,req.body.Cdob,req.body.Cstatus,req.body.Cphoto],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


app.post('/api/candidate_login',(req, res) => {

    let sql = "Select * from candidate where Cemail = ? AND Cpassword = ? ORDER BY Cid DESC LIMIT 1";

  let query = conn.query(sql,[req.body.Cemail,req.body.Cpassword],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200,"message":"Login Succesfull.", "error": null, "response": results}));
  });
});

app.post('/api/admin_login',(req, res) => {

  let sql = "INSERT INTO admin(Adminpassword) values (?)";
  let query = conn.query(sql,[req.body.Adminpassword],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/area_name',(req, res) => {

  let sql = "INSERT INTO area(Aname,Apopulation,Atotalvoter,Acandidateid,Atotalcandidate,Avoterid,Apartyid,Ctid) values (?,?,?,?,?,?,?,?)";
  let query = conn.query(sql,[req.body.Aname,req.body.Apopulation,req.body.Atotalvoter,req.body.Acandidateid,req.body.Atotalcandidate,req.body.Avoterid,req.body.Apartyid,req.body.Ctid],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/death_name',(req, res) => {

  let sql = "INSERT INTO death(Dvoterid,Dareaid,Ddeathname,Ddeathage) values (?,?,?,?)";
  let query = conn.query(sql,[req.body.Dvoterid,req.body.Dareaid,req.body.Ddeathname,req.body.Ddeathage],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/feedback_name',(req, res) => {

  let sql = "INSERT INTO feedback(FBtype,FBdesc) values (?,?)";
  let query = conn.query(sql,[req.body.FBtype,req.body.FBdesc],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/party_name',(req, res) => {

  let sql = "INSERT INTO party(Pname,Plogo,PtotC,Cid,Aid,Phist) values (?,?,?,?,?,?)";
  let query = conn.query(sql,[req.body.Pname,req.body.Plogo,req.body.PtotC,req.body.Cid,req.body.Aid,req.body.Phist],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/state_name',(req, res) => {

  let sql = "INSERT INTO state(Sname) values (?)";
  let query = conn.query(sql,[req.body.Sname],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/result',(req, res) => {

  let sql = "INSERT INTO voting(Vid,Cid,result) values (?,?,?)";
  let query = conn.query(sql,[req.body.Vid,req.body.Cid,req.body.result],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/get_candidateprofile',(req, res) => {

  let sql = "SELECT * FROM candidate where Cid = ?";
  let query = conn.query(sql,[req.body.Cid],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/get_voterprofile',(req, res) => {

  let sql = "SELECT * FROM voter where Vid = ?";
  let query = conn.query(sql,[req.body.Vid],(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/update_candidate_profile',(req, res) => {

  let sql = "UPDATE candidate SET Cname = ?,Cemail = ? ,Cph = ?,Caddress = ?,Ccity = ?,Cstate = ?,Cstatus = ? WHERE Cid = ?";
  let query = conn.query(sql,[req.body.Cname,req.body.Cemail,req.body.Cph,req.body.Caddress,req.body.Ccity,req.body.Cstate,req.body.Cstatus,req.body.Cid],(err, results) => {
    if(err) throw err;

    if(results.affectedRows > 0)
        res.send(JSON.stringify({"status": 200, "error": null, "message":  "Update Successfully"}));
    else
        res.send(JSON.stringify({"status": 404, "error": null, "message":  "Update Fail"}));

  });
});

app.post('/api/update_voter_profile',(req, res) => {

  let sql = "UPDATE voter SET Vname = ? , Vemail = ? , Vph = ? ,Vaddress = ? , Vcity = ?,Vstate = ? WHERE Vid = ?";
  let query = conn.query(sql,[req.body.Vname,req.body.Vemail,req.body.Vph,req.body.Vaddress,req.body.Vcity,req.body.Vstate,req.body.Vid],(err, results) => {
    if(err) throw err;

    if(results.affectedRows > 0)
          res.send(JSON.stringify({"status": 200, "error": null, "message":  "Update Successfully"}));
      else
          res.send(JSON.stringify({"status": 404, "error": null, "message":  "Update Fail"}));
  });
});



//Server listening
app.listen(3012,() =>{
  console.log('Server started on port 3012...');
});

app.get('/api/getfeedpost',(req, res) => {
  let sql = "SELECT * FROM feedpost";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});