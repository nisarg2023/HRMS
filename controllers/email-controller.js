const nodemailer = require("nodemailer");

const sendMail = async(email) =>{

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "concepcion.lindgren@ethereal.email",
          pass: "uB8uqBE7QUfaXAc68f", 
        },
    })
        let mailInfo ={
            from: '"HRMS" <concepcion.lindgren@ethereal.email>' ,
            to: email,
            subject: 'Welcome to HRMS',
            html:`<div>
                   <h2>Welcome to the HRMS this is the guide to use this system.<h2>

                   <p>Here is the Fucntionality of the hrms system</p>
                   <ul>
                   <li>Check in<li>
                   <li>Check out<li>
                   <li>Break in<li>
                   <li>Break out<li>
                   <li>Attendance of all the employees<li>
                   <li>Leave application<li>
                   </ul>
                  </div>`
            }
           
        transporter.sendMail(mailInfo, function(error, info){
          if (error) {
            console.log(error);
          } 
          else {
            console.log('Email sent successfully');
          }
        })   
}
module.exports= {sendMail}