const bcrypt=require('bcryptjs');

const User=require('../models/User');

const nodemailer=require('nodemailer');//import nodemailer to send mails to varify

const transporter=nodemailer.createTransport({//transporter bnaya using nodemailer 
    service:'gmail',
    auth:{
      user:'psrathor16072000@gmail.com',
      pass:'Piyush*123'
    }
    });


exports.postSignUp=(req,res,next)=>{
    const val = Math. floor(1000 + Math. random() * 9000).toString(); 
    const name=req.body.name;
    const email=req.body.signUpEmail;
    const password=req.body.signUpPassword;
    const confirmPassword=req.body.confirmPassword;
    if(password!=confirmPassword){
        return res.rend("<h1>Your Password and Confirm Password did not match")
    }

    User.findOne({ email: email })//FindOne method provided y mongoose ye seach karega sare users m k wo exist kar rha k ni user
    .then(user => {
      if (user) { 
        return  res.send("<h1>You Have allready Account</h1>")
      }
          var mailOptions={
            from:'psrathor16072000@gmail.com',
            to:email,
            subject:'Sending Email Using Gmail',
            html:`<p>hey dude</p>
            <h4>You Gonna SignIn On ChatBox....</h4>
            <p>Your OTP is </p>
            <h1>${val}</h1>`
        }
        bcrypt.hash(val,12).then(val=>{
          res.render('normal-view/sucsessfully_loggedIn.ejs',{
            otp:val,
            name:name,
            email:email,
            password:password,
            Otp4forgeeting:false
            
        })
        return  transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error);
          }
          else{
            console.log('Email Sent:'+info.response);
          }
        })
        })
         
})
}

exports.postOtp=(req,res,next)=>{
    var otp=req.body.otp.toString();
    var val=req.body.otp2;
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    bcrypt.compare(otp,val).then(domatch=>{
      if(domatch){
        bcrypt
        .hash(password, 12)//ab es password ko hashed password m convert kiya than save kiya 
        .then(hashedPassword => {
          const user = new User({
            name:name,
            email: email,
            password: hashedPassword
          });
          return user.save();
        }) .then(result => {
          return res.send('<h1>Your Otp Match');
        }) .catch(err=>{
        console.log(err);
           });
      }
      else{
        return res.send("<h1>Your Otp and PassWord did not Match");
    }
    })
    
       
       
           
 }
    
exports.lostPassword=(req,res,next)=>{
  const val = Math. floor(1000 + Math. random() * 9000).toString(); 
    const email=req.body.lostPasswordEmail;
    var mailOptions={
      from:'psrathor16072000@gmail.com',
      to:email,
      subject:'Sending Email Using Gmail',
      html:`<p>hey dude</p>
      <p>Your OTP is </p>
      <h1>${val}</h1>`
  } 
  User.findOne({email:email}).then(user=>{
    if(user){
      bcrypt.hash(val,12).then(val=>{
        res.render('normal-view/sucsessfully_loggedIn.ejs',{
          otp:val,
          Otp4forgeeting:true,
          userId:user._id      
      })
      return  transporter.sendMail(mailOptions,function(error,info){
        if(error){
          console.log(error);
        }
        else{
          console.log('Email Sent:'+info.response);
        }
      })
      })
    
    }
    else{
      res.send("<h1>You do not have account ...")
    }
  })
 

}