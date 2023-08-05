const mysql = require('mysql');
const express = require('express');
var app = express();
const router = express.Router()
const {body, validationResult} = require('express-validator')
// app.use(express.json());

router.post('/',[
    body("name", "name field cannot be empty").not().isEmpty(),
    body("email", "email field cannot be empty").not().isEmpty(),
    body("phone", "phone field cannot be empty").not().isEmpty(),
    body("org", "organization field cannot be empty").not().isEmpty(),
    body("msg", "email field cannot be empty").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("phone", "Enter a valid 10 digit phone number").isLength(10)
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'contactusdb',
        password: '12345678',
        database: 'contactus'
    })
    con.connect(function(error){
        if (error) throw error
        console.log("connect to mysql db")
    })
    const {name, email, phone, org, msg} = req.body
    var sql = `INSERT INTO messagedetails (name , email , phone , org , message) VALUES ('${name}' , '${email}' , '${phone}' , '${org}' , '${msg}')`
    con.query(sql, function(error, result){
        if(error){
            res.send({"error": error})
        }
        res.send("form submitted successfully")
    })
    con.end()

})
module.exports = router