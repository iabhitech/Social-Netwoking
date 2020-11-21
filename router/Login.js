const express=require("express");

const LoginController=require('../conroller/Login');

const router=express.Router();

router.get('/Login',LoginController.getLogin);

router.post('/login',LoginController.postLogin);

router.post('/postSubsequent',LoginController.postSubsequent);

router.post('/changePassword',LoginController.postChangePassword);

module.exports=router;