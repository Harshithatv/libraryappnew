const form = document.querySelector("form");
title = form.querySelector(".title"),
author = form.querySelector(".author"),
genre = form.querySelector(".genre"),
image= form.querySelector(".image"),
titleI = title.querySelector("input"),
authorI = author.querySelector("input"),
genreI = genre.querySelector("input"),
imageI=image.querySelector("input");
file= document.getElementById("imge");
form.onsubmit = (e)=>{
  e.preventDefault(); 
  (titleI.value == "") ? title.classList.add("error") : checkTitle();
  (authorI.value == "") ? author.classList.add("error") : checkAuthor();
  (genreI.value == "") ? genre.classList.add("error") : checkGenre();
  
  titleI.onkeyup = ()=>{checkTitle();} 
  authorI.onkeyup = ()=>{checkAuthor();}
  genreI.onkeyup = ()=>{checkGenre();}

  function checkTitle(){ 
    let pattern=/^[a-zA-Z ]{3,30}$/; 
    if(!titleI.value.match(pattern)){ 
      title.classList.add("error");
      title.classList.remove("valid");
    }else{ 
      title.classList.remove("error");
      title.classList.add("valid");
    }
  }

  function checkAuthor(){ 
    let pattern =/^[a-zA-Z ]{3,30}$/; 
    if(!authorI.value.match(pattern)){ 
        author.classList.add("error");
        author.classList.remove("valid");
    }else{ 
        author.classList.remove("error");
        author.classList.add("valid");
    }
  }
  function checkGenre(){ 
    let pattern =/^[a-zA-Z ]{3,30}$/; 
    if(!genreI.value.match(pattern)){ 
        genre.classList.add("error");
        genre.classList.remove("valid");
    }else{ 
        genre.classList.remove("error");
        genre.classList.add("valid");
    }
  }

  
  if(!title.classList.contains("error") && !author.classList.contains("error") && !genre.classList.contains("error") && (!file.files.length == 0 )){
    window.location.href = form.getAttribute("action"); 
   
  }
}



function showFiles(){
  let inputField=document.getElementById('imge');
  let file=inputField.files;
  let fileReader=new FileReader;
  
  
  fileReader.onload=function(event){
      let ImageUrl=event.target.result;
      $("#preview").attr("src",`${ImageUrl}`)
  }
  fileReader.readAsDataURL(file[0]);
}

