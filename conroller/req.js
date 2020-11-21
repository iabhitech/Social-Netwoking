const User=require('../models/User');

exports.sentFrndReq=((req,res,next)=>{
 const senderId=req.body.senderId;
 const reciverId=req.body.reciverId;
 User.findById({_id:reciverId}).then(user=>{
     if(!user.friendsReq.friendsId[0] && !user.friends.friendsId[0]){
        user.friendsReq.friendsId.push(senderId);
        return user.save();
    }
    if(user.friends.friendsId[0] && !user.friendsReq.friendsId[0]){
        var counta=0
        for (i=0;i<user.friends.friendsId.length;i++){
            counta=counta+1;
           if(user.friends.friendsId[i].toString()==senderId.toString()){
               counta=0
               break;
           }
           if(counta==user.friends.friendsId.length){
               user.friendsReq.friendsId.push(senderId);
              return user.save();
           }
        }
    }
    if(!user.friends.friendsId[0] && user.friendsReq.friendsId[0]){
        var counta=0
        for (i=0;i<user.friendsReq.friendsId.length;i++){
            counta=counta+1;
           if(user.friendsReq.friendsId[i].toString()==senderId.toString()){
               counta=0
               break;
           }
           if(counta==user.friendsReq.friendsId.length){
               user.friendsReq.friendsId.push(senderId);
              return user.save();
           }
        }
        
    }
    if(user.friends.friendsId[0] && user.friendsReq.friendsId[0]){
        var counta=0
        for (i=0;i<user.friendsReq.friendsId.length;i++){
            counta=counta+1;
           if(user.friendsReq.friendsId[i].toString()==senderId.toString()){
               counta=0
               break;
           }
           if(counta==user.friendsReq.friendsId.length){
               user.friendsReq.friendsId.push(senderId);
           }
        }
        var counta=0
        for (i=0;i<user.friends.friendsId.length;i++){
            counta=counta+1;
           if(user.friends.friendsId[i].toString()==senderId.toString()){
               counta=0
               break;
           }
           if(counta==user.friends.friendsId.length){
               user.friendsReq.friendsId.push(senderId);
              return user.save();
           }
        }
        
    }
   
    return user.save();
}).then(user=>{
    res.redirect('/login#');
    

 })})

 exports.acceptReq=((req,res,next)=>{
     const senderId=req.body.reqsenderId;
     const accepterId=req.body.accepterId;
     User.findById({_id:accepterId}).then(user=>{
         
         User.findById({_id:senderId}).then(userSender=>{
             userSender.friends.friendsId.push(accepterId);
             user.friends.friendsId.push(senderId);
             user.friendsReq.friendsId.pop(senderId);
            user.save();
            return userSender.save();
         }).then(result=>{
            res.redirect('/login#');
         }).catch(err=>{
             console.log(err);
         })
     }).catch(err=>{
         console.log(err);
     })
 })

 exports.cancleReq=((req,res,next)=>{
    const senderId=req.body.reqsenderId;
    const accepterId=req.body.accepterId;
    User.findById({_id:accepterId}).then(user=>{
       user.friendsReq.friendsId.pop(senderId);
       return user.save();
    }).then(result=>{
        res.redirect('/login#');

    }).catch(err=>{
        console.log(err);
    })
})

exports.unfrndReq=((req,res,next)=>{
    const userId=req.body.userId;
    const unFrndId=req.body.removeFrndId;
    User.findOne({_id:userId}).then(user=>{
        User.findOne({_id:unFrndId}).then(unFrnd=>{

            
            user.friends.friendsId=user.friends.friendsId.filter(frndsIs => frndsIs != unFrndId)
            unFrnd.friends.friendsId=unFrnd.friends.friendsId.filter(frndsIs => frndsIs != userId)
          user.save();
          unFrnd.save();
        })
    })
    res.send("<h1>hfgcgh<h1>");

})

