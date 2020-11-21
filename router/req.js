const express=require("express");

const reqController=require('../conroller/req');

const router=express.Router();

router.post('/sendreq',reqController.sentFrndReq);

router.post('/acceptReq',reqController.acceptReq);

router.post('/cancleReq',reqController.cancleReq);

router.post('/unfrnd',reqController.unfrndReq);


module.exports=router;