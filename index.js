const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const conn = require('./config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)



//require routes
const userRoutes = require('./routes/user.route');
const employeeForm = require('./routes/employee-form.route');


//set up middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(session({
    key:"sessionid",
    resave:false,
saveUninitialized:true,
secret:"red"}));

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');


//define routes

app.use("/",userRoutes);
app.use("/employee/",employeeForm);

app.listen(8000, () => {
    console.log("Server is running on port 8000");

})
