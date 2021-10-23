const express=require('express');
const signupRouter=express.Router();

const Userdata=require('../model/Userdata');

function router(){
    signupRouter.get('/',function(req,res){
        res.render("signup",
        {
            
            title:'Library',
            msg:''
            
        })
    })
    signupRouter.post('/add',async(req,res)=>{
        try{
          
            const username=req.body.username;
            const email=req.body.email;
            const password=req.body.password;
            const confirmpassword=req.body.confirmpassword;
            let upattern=/^[a-zA-Z ]{3,30}$/;
            let epattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if((username==="")||(email==="")||(password==="")||(confirmpassword==="")){
                res.render("signup",
                {
                    
                    title:'Library',
                    msg:'All fields are required'
                    
                })

                console.log("All fields are required"); 
                }
            if(!username.match(upattern)){
                res.render("signup",
                {
                    
                    title:'Library',
                    msg:'Invalid username'
                    
                })

                console.log("invalid username"); 
            }
            if(!email.match(epattern)){
                res.render("signup",
                {
                    
                    title:'Library',
                    msg:'Invalid email'
                    
                })

                console.log("invalid email"); 
            }
            
            if(password === confirmpassword){
                const items ={
                    username:req.body.username,
                    email:req.body.email,
                    password:password,
                    confirmpassword:confirmpassword
                }
                const user= await Userdata(items);
                user.save();
                res.redirect('/signin');   
            }
            if(password !== confirmpassword){
               res.render("signup",
                {
                    
                    title:'Library',
                    msg:'Password are not matching'
                    
                })

                console.log("password are not matching"); 
            } 
        
          
        }
    
        catch{
           
          console.log("error");
          }
    })
    return signupRouter; 
}
module.exports=router;
