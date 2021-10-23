const form = document.querySelector("form");
user = form.querySelector(".user"),
email= form.querySelector(".email"),
password = form.querySelector(".password"),
confirmPassword = form.querySelector(".confirmPassword"),
userI = user.querySelector("input"),
emailI = email.querySelector("input"),
passI = password.querySelector("input")
confirmI = confirmPassword.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); 
  (userI.value == "") ? user.classList.add("error") : checkUser();
  (emailI.value == "") ? email.classList.add("error") : checkEmail();
  (passI.value == "") ? password.classList.add("error") : checkPass();
  (confirmI.value == "") ? confirmPassword.classList.add("error") : checkConfirm();
  userI.onkeyup = ()=>{checkUser();} 
  emailI.onkeyup = ()=>{checkEmail();} 
  passI.onkeyup = ()=>{checkPass();}
  confirmI.onkeyup = ()=>{checkConfirm();} 

  function checkUser(){ 
    let pattern=/^[a-zA-Z ]{3,30}$/; 
    if(!userI.value.match(pattern)){ 
      user.classList.add("error");
      user.classList.remove("valid");
    }else{ 
      user.classList.remove("error");
      user.classList.add("valid");
    }
  }
  function checkEmail(){ 
    let pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailI.value.match(pattern)){ 
      email.classList.add("error");
      email.classList.remove("valid");
    }else{ 
      email.classList.remove("error");
      email.classList.add("valid");
    }
  }

  function checkPass(){ 
    let pattern =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/; 
    if(!passI.value.match(pattern)){ 
        password.classList.add("error");
        password.classList.remove("valid");
    }else{ 
        password.classList.remove("error");
        password.classList.add("valid");
    }
  }
  function checkConfirm(){ 
    
    if(confirmI.value!=passI.value){ 
        confirmPassword .classList.add("error");
        confirmPassword .classList.remove("valid");
    }else{ 
        confirmPassword .classList.remove("error");
        confirmPassword .classList.add("valid");
    }
  }



  if(!user.classList.contains("error") && !email.classList.contains("error") && !password.classList.contains("error") && !confirmPassword.classList.contains("error")){
    window.location.href = form.getAttribute("action"); 
  }
}

