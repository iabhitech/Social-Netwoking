const express=require('express');

const signUpController=require('../conroller/SignUp');

const router=express.Router();

router.post('/signup',signUpController.postSignUp);

router.post('/lostPassword',signUpController.lostPassword);

router.post('/postotp',signUpController.postOtp);

module.exports=router;