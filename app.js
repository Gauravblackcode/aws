const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const listRoutes = require('./routes/list');
const uploadRoutes = require('./routes/upload');
const createRoutes = require('./routes/create');
const loginRoutes = require('./routes/login')

app.set('view engine', 'ejs'); 
app.set('views', 'views'); 
app.use(express.static(__dirname + '/'));

app.use(listRoutes);
app.use(uploadRoutes);
app.use(createRoutes);
app.use(loginRoutes);

app.listen(3000);