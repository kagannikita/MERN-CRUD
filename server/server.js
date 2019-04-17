var bodyParser = require('body-parser');
var express = require('express');
var cors=require('cors');
var productroute = require('./routes/productroute.js');
var app = express();
app.use(bodyParser());
app.use(cors());
app.use('/', productroute);
app.listen(3001, function() {
  console.log('Server started on port 3001');
})
