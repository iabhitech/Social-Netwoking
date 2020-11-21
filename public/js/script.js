
  
  const  loginBtn = document.querySelectorAll(".login-btn"),
  registerBtn = document.querySelectorAll(".register-btn"),
  lostPassBtn = document.querySelectorAll(".lost-pass-btn"),
  box = document.querySelector(".box"),
  loginForm = document.querySelector(".login-form"),
  registerForm = document.querySelector(".register-form"),
  lostPasswordForm = document.querySelector(".lost-password-form");

/*degining relatedCode*/

registerBtn.forEach((btn) =>{
btn.addEventListener("click",() =>{
box.classList.add("slide-active");
registerForm.classList.remove("form-hidden");
loginForm.classList.add("form-hidden");
lostPasswordForm.classList.add("form-hidden");
});
});

loginBtn.forEach((btn) =>{
btn.addEventListener("click",() =>{
box.classList.remove("slide-active");
registerForm.classList.add("form-hidden");
loginForm.classList.remove("form-hidden");
lostPasswordForm.classList.add("form-hidden");
});
});

lostPassBtn.forEach((btn) =>{
btn.addEventListener("click",() =>{
registerForm.classList.add("form-hidden");
loginForm.classList.add("form-hidden");
lostPasswordForm.classList.remove("form-hidden");
});
});
/*Finish degining related Code*/
const span=document.getElementsByClassName("span");
/*Validation Relation Code*/
function validater(){
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;  
  const email=document.getElementsByName("email");
  const password=document.getElementsByName("password1");
  if(email[0].value==""){
    document.getElementsByClassName('span')[0].innerHTML="** Please fill the Email**"+"<br>";
    return false;
  }

  if(password[0].value==""){
    document.getElementsByClassName('span')[1].innerHTML="** Please fill the Password**"+"<br>";
    return false;
  }
  if(password[0].value.length<5 || password[0].value.length>15){
    document.getElementsByClassName('span')[1].innerHTML="** Password Must Containt Min 5 max 15**"+"<br>";
    return false;
  }
  if(!password[0].value.match(decimal)){
    document.getElementsByClassName('span')[1].innerHTML="** Password Must Containt a Capital letter a small letter a number and a special Charecter**"+"<br>";
    return false;
  }
}
function validater2(){
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/; 
  const name=document.getElementById("name"); 
  const email=document.getElementsByName("signUpEmail");
  const password=document.getElementsByName("signUpPassword");
  const confirmPassword=document.getElementsByName("confirmPassword");
  if(name.value==""){
    document.getElementsByClassName('span')[2].innerHTML="** Please fill Your Name**"+"<br>";
    return false;
  }
  if(name.value.length <3 || name.value.length>40){
    document.getElementsByClassName('span')[2].innerHTML="** Please Name should in between 3 to 40 chars**"+"<br>";
    return false;
  }
  if(email[0].value=="psrathor16072000@gmail.com"){
    document.getElementsByClassName('span')[3].innerHTML="** Please fill Your Email**"+"<br>";
    return false;
  }
  if(email[0].value==""){
    document.getElementsByClassName('span')[3].innerHTML="** Please fill the Email**"+"<br>";
    return false;
  }
 
  if(password[0].value==""){
    document.getElementsByClassName('span')[4].innerHTML="** Please fill the Password**"+"<br>";
    return false;
  }
  if(password[0].value.length<5 || password[0].value.length>15){
    document.getElementsByClassName('span')[4].innerHTML="** Password Must Containt Min 5 max 15**"+"<br>";
    return false;
  }
  if(!password[0].value.match(decimal)){
    document.getElementsByClassName('span')[4].innerHTML="** Password Must Containt a Capital letter a small letter a number and a special Charecter**"+"<br>";
    return false;
  }
  if(password[0].value!=confirmPassword[0].value){
    document.getElementsByClassName('span')[5].innerHTML="** Passwords didnt match**"+"<br>";
    return false;
  }
}
function validater3(){
  var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const lostPasswordEmail=document.getElementsByName("lostPasswordEmail");
  if(!lostPasswordEmail[0].value.match(mailformat))
  {
    document.getElementsByClassName('span')[6].innerHTML="** Invalid Email**"+"<br>";
    return false;
  }  
}




