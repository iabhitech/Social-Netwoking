const User=require('../models/User');
const Chat=require('../models/Chat');
const bcrypt=require('bcryptjs');
const { find, count } = require('../models/User');

exports.getLogin=(req,res,next)=>{
    res.render('Form.ejs');
};

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password1;
    User.findOne({email:email}).then(user=>{
        if(!user){
           return res.send("you dont have account Please First than Login");
        }
        bcrypt
        .compare(password, user.password)//yha p chek h rha h password sahi h k na 
        .then(doMatch => {
            if(doMatch){
                User.find({_id:user.friends.friendsId}).then(friends=>{//user k friens 
                a=user.friends;//User k frind ki ids 
                a.friendsId.push(user._id)//usme khud ki id ki
                b=a.friendsId.concat(user.friendsReq.friendsId)//and fir usme apni frndreq wali id add kar di
                User.find({_id:{$nin:b}}).then(findFrnd=>{//user k find frnds 
                       User.find({_id:user.friendsReq.friendsId}).then(reqFrnd=>{//kon kon frnd req send kiya h user ko wo
                        return res.render('chat-box/index.ejs',{
                            friends:friends,
                            userId:user._id,
                            allUser:findFrnd,
                            frndUser:reqFrnd,
                            chattingMode:false,
                            user:user
                        })   
                       })  
                    })           })     
    }
        else{
        return res.send("<h1>Your email or password may wrong</h1>");
    }   
    })
    })
};

exports.postSubsequent=(req,res,next)=>{
    const userId=req.body.userId;
    const opt=req.body.otp.toString();
    const val=req.body.otp2;
    bcrypt.compare(opt,val).then(doMatch=>{
        if(doMatch){
        return res.render('normal-view/change-password.ejs',{
            userId:userId
        });
        }
        else{
        return res.send("<h1>Your Otp did not Match</h1>")
        }
    })
   
}

exports.postChangePassword=(req,res,next)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    if(password!=confirmPassword){
        return res.send("Password did not Match");
    }
    User.findOne({_id:userId}).then(user=>{
        if(!user){
            return res.send("Some Error accured");
        }
        resetUser=user;
        return bcrypt.hash(password,12)
       }).then(hashedPassword=>{
           resetUser.password=hashedPassword;
           return resetUser.save();
    }).then(result=>{
        return res.send("<h1>Your Password Sucsessfully Changed</h1>");
    })
}