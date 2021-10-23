const form = document.querySelector("form");
user = form.querySelector(".user"),
password = form.querySelector(".password"),
userI = user.querySelector("input"),
passI = password.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); 
  (userI.value == "") ? user.classList.add("error") : checkUser();
  (passI.value == "") ? password.classList.add("error") : checkPass();
 
  userI.onkeyup = ()=>{checkUser();} 
  passI.onkeyup = ()=>{checkPass();}

  function checkUser(){ 
    let pattern=/^(admin)$/; 
    if(!userI.value.match(pattern)){ 
      user.classList.add("error");
      user.classList.remove("valid");
    }else{ 
      user.classList.remove("error");
      user.classList.add("valid");
    }
  }

  function checkPass(){ 
    let pattern =/^(12345)$/; 
    if(!passI.value.match(pattern)){ 
        password.classList.add("error");
        password.classList.remove("valid");
    }else{ 
        password.classList.remove("error");
        password.classList.add("valid");
    }
  }
 
  if(!user.classList.contains("error") && !password.classList.contains("error")){
    window.location.href = form.getAttribute("action"); 
  }
}

