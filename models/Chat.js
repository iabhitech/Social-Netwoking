const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  
  user1:{
    type: Schema.Types.ObjectId,
    required:true
  },
  user2:{
    type: Schema.Types.ObjectId,
    required:true
  },
  chat:
  [
    [{
      type: String,
    },{
      type:Date
    }]
  ],
});
module.exports = mongoose.model('Chat', chatSchema);