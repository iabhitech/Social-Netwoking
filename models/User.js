const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
  email: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  friends:{
  friendsId:[
    {
      type: Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
  ]},
  friendsReq:{
    friendsId:[
    {
      type: String,
      ref:'User',
      required:true
    }],
  },
  imageUrl:{
    type:String,
    default:"images/2020-11-21T08:35:14.292Z-def.png"
  },
  About:{
    type:String,
    default:"Webside User"
  }
 
});
module.exports = mongoose.model('User', userSchema);