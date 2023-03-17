const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./config/dbConnect');



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

// HEADER-UI
app.get("/dashboard", function(req,res){
    res.render('dashboard.ejs')
})

app.listen(8000, () => {
    console.log("Server is running on port 8000");

})
