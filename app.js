const express=require('express');

const bodyParser=require("body-parser");
const multer=require("multer");

const mongoose=require('mongoose');
MONGODB_URI='mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/Chat-box?retryWrites=true&w=majority';//a Permanent constant url h apne database ka

const fileStorage=multer.diskStorage({//multer package ka use karake destination matlab kha save karana h set kar rhe h and name set kar rhe h
  destination:(req,file,cb)=>{
    cb(null,'images');
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString()+'-'+file.originalname)//name diya h date se related
  }
})

const fileFilter=(req,file,cb)=>{//fileFilter set kiya h hame es es type ki file hi keval accept karani h
  if(file.mimetype=='image/jpg' || file.mimetype==='image/png' ||  file.mimetype==='image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const path=require('path');

const app=express();

const loginRouter=require('./router/Login');
const signUpRouter=require('./router/Signup');
const chatRouter=require('./router/Chat');
const reqRouter=require('./router/req');
const photoRouter=require('./router/Photo');




app.use(bodyParser.urlencoded({ extended: false }));//use kiya h body-Parser
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('userProfilePhoto'));
app.use(express.static(path.join(__dirname, 'public')));//ye hamane css k path ko add kiya
app.use('/images',express.static(path.join(__dirname, 'images')));//ye hamane css k path ko add kiya

app.set('view engine', 'ejs');//ejs ka engine use ho rha h ye btaya 
app.set('views', 'views');//folder btaya k apne ejs ki files eske andar rakhi h pahala views represent kar rha h k ham ejs ki location de rhe h and dusara folder ka nam

app.use(loginRouter);
app.use(signUpRouter);
app.use(chatRouter);
app.use(reqRouter);
app.use(photoRouter);




mongoose
  .connect(
    MONGODB_URI
  )//mongoose database connect ho jaye 
  .then(result => {//than tab hi server on ho
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });