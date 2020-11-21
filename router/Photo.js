const express=require("express");

const photoController=require('../conroller/Photo');


const router=express.Router();

router.post('/uploadProfilePhoto',photoController.profilePhotoUpload);

router.post('/removeProfilePhoto',photoController.removeProfilePhoto);



module.exports=router;