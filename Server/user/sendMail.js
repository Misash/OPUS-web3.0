
const nodemailer = require('nodemailer');

//Step1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'spacialWeb3@gmail.com',
        pass:'opus1234'
    }
});


//Step 2
let mailOptions ={
    from:'OPUS',
    to:'aaron.apaza@ucsp.edu.pe',
    subject:'Testing and testing',
    text:'Welcome to OPUS',
};

//Spet 3

transporter.sendMail(mailOptions,function(err, data){
    if(err){
        console.log('Error Occurs: ',err);
    }else{
        console.log('Email sent!!!');
    }
});