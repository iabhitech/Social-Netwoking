const express=require("express");

const chatController=require('../conroller/Chat');


const router=express.Router();

router.post('/Sendmassage',chatController.sendMassage);

router.get('/openChatmenu/:ChatterId',chatController.getMassages);

module.exports=router;