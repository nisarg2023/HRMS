const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// const bcrypt = require('bcryptjs');
// const util=require("util")
const cookieParser = require("cookie-parser");
// var http = require('http');
// var url = require('url');
// var querystring = require('querystring');
// const { json } = require("express");

const path = require("path")

app.use(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine","ejs");
app.use(cookieParser());


const conn = require('./config/dbConnect');


//var query=util.promisify(conn.query).bind(conn)

//require routes
const userRoutes = require('./routes/user.route');


//set up middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');


//define routes
app.use("/",userRoutes);

app.listen(8888, () => {
    console.log("Server is running on port 8000");

})
