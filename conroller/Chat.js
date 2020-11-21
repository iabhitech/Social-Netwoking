const User=require('../models/User');
const Chat=require('../models/Chat');

exports.sendMassage=(req,res,next)=>{
    const massage=req.body.massage;
    const senderId=req.body.senderId;
    const reciverId=req.body.reciverId;
   Chat.find({$or:[{user1:senderId,user2:reciverId},{user1:reciverId,user2:senderId} ]}).then(user=>{
       let userhim=user[0]
       if(userhim!=undefined){
            userhim.chat.push([massage,Date(),senderId])
            userhim.save();
            res.send("<h1>Youe massage is send</h1>")
        }
       else{
           const chat=new Chat({
               user1:senderId,
               user2:reciverId,
               chat:[[massage,Date(),senderId]]
           });
           chat.save();
           res.send("<h1>Your Massage Is send</h1>")
       }

   })
}

exports.getMassages=(req,res,next)=>{
    var chatter=req.params.ChatterId;
    const userId=req.query.userId;
    Chat.findOne({$or:[{user1:userId,user2:chatter},{user1:chatter,user2:userId} ]}).then(chat=>{
        User.findOne({_id:userId}).then(user=>{
            if(!user){
               return res.send("you dont have account Please First than Login");
            }
            User.findOne({_id:chatter}).then(chatter=>{
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
                            chattingMode:true,
                            chat:chat==null?null:chat,
                            chatterId:chatter._id,
                            chatter:chatter,
                            user:user
                        })   
                       })  })
                    })           })     
        
        })
    })      
}