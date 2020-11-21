const User=require('../models/User');


exports.profilePhotoUpload=(req,res,next)=>{
    const profilePhoto=req.file;
    const userId=req.body.userId;
    User.findOne({_id:userId}).then(user=>{
        user.imageUrl=profilePhoto.path;
        user.save();
    })
    res.send("your dp changed");

}
exports.removeProfilePhoto=(req,res,next)=>{
    const userId=req.body.userId;
    User.findOne({_id:userId}).then(user=>{
        user.imageUrl="images/2020-11-21T07:15:31.202Z-def.png";
        user.save();
    })
    res.send("your dp Removed");

}