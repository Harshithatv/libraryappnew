const form = document.querySelector("form");
title = form.querySelector(".name"),
famouswork = form.querySelector(".famouswork"),
nationality = form.querySelector(".nationality"),
image=form.querySelector(".image"),
titleI = title.querySelector("input"),
famousworkI = famouswork.querySelector("input"),
nationalityI = nationality.querySelector("input"),
imageI = image.querySelector("input"),
file= document.getElementById("imge");
form.onsubmit = (e) => {
    e.preventDefault();
    (titleI.value == "") ? title.classList.add("error") : checkTitle();
    (famousworkI.value == "") ? famouswork.classList.add("error") : checkfamouswork();
    (nationalityI.value == "") ? nationality.classList.add("error") : checknationality();
    
    titleI.onkeyup = () => { checkTitle(); }
    famousworkI.onkeyup = () => { checkfamouswork(); }
    nationalityI.onkeyup = () => { checknationality(); }

    function checkTitle() {
        let pattern = /^[a-zA-Z ]{3,30}$/;
        if (!titleI.value.match(pattern)) {
            title.classList.add("error");
            title.classList.remove("valid");
        } else {
            title.classList.remove("error");
            title.classList.add("valid");
        }
    }

    function checkfamouswork() {
        let pattern = /^[a-zA-Z ]{3,30}$/;
        if (!famousworkI.value.match(pattern)) {
            famouswork.classList.add("error");
            famouswork.classList.remove("valid");
        } else {
            famouswork.classList.remove("error");
            famouswork.classList.add("valid");
        }
    }
    function checknationality() {
        let pattern = /^[a-zA-Z ]{3,30}$/;
        if (!nationalityI.value.match(pattern)) {
            nationality.classList.add("error");
            nationality.classList.remove("valid");
        } else {
            nationality.classList.remove("error");
            nationality.classList.add("valid");
        }
    }

    if (!title.classList.contains("error") && ! famouswork.classList.contains("error") && !nationality.classList.contains("error") && (!file.files.length == 0 )) {
        window.location.href = form.getAttribute("action");
        document.getElementById('msg').innerHTML="Author added Successfully";
        
    }

}

function showFiles() {
    let inputField = document.getElementById('imge');
    let file = inputField.files;
    let fileReader = new FileReader;


    fileReader.onload = function (event) {
        let ImageUrl = event.target.result;
        $("#preview").attr("src", `${ImageUrl}`)
    }
    fileReader.readAsDataURL(file[0]);
}

