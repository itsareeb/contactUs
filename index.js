const express = require('express');

var app = express();
app.use(express.json());

app.use('/api/contactus', require('./routes/contactapi'))
app.use('/api/aboutus', require('./routes/aboutUs'))

app.listen(3000, ()=>{console.log("listening to port 3000")})
