const express=require('express');
const signinRouter=express.Router();
const Userdata=require('../model/Userdata');

function router(){
    signinRouter.get('/',function(req,res){
        res.render("signin",
        {
            
            title:'Library',
            msg:''
        })
       
    })
    signinRouter.post('/add', async(req,res)=>{
        
      try{
          const username=req.body.username;
          const password=req.body.password;
          if((username==="")||(password==="")){
            res.render("signin",
            {
                
                title:'Library',
                msg:'All fields are required'
                
            })

            console.log("all fields are required"); 
            }


        const user=await Userdata.findOne({username:username});
          if(user.password === password){
            res.redirect('/index');     
          }
          else{   
            res.render("signin",
            {
                
                title:'Library',
                msg:'Invalid login details'
            }) 
           console.log("invalid login details");  
          }
      }
      catch{  
        res.render("signin",
            {
                
                title:'Library',
                msg:'Invalid login details'
            }) 
           console.log("invalid login details");  
          }
    

    })
    return signinRouter; 
}
module.exports=router;
