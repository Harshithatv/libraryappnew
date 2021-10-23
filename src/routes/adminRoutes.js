const express=require('express');
const adminRouter=express.Router();
const Bookdata=require('../model/Bookdata');
var multer = require('multer');
var path = require('path');
var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('image');
 
function router(nav){
    adminRouter.get('/',function(req,res){
        res.render("addbook",
        {
            nav,
            title:'Library',
            msg:''
            
        })
    })
   
    adminRouter.post('/add',upload,function(req,res){
       
       var item={
           title:req.body.title,
           author:req.body.author,
           genre:req.body.genre,
           image:req.file.filename,
       }
       var book=Bookdata(item);
       book.save();
       res.redirect('/books');
    });

    adminRouter.get('/update/:id',upload,function(req,res){
       
       
        Bookdata.findOneAndUpdate({_id: req.params.id},req.body,{new:true}, (err,docs)=>{
            if(err){
                console.log("error");    
            }
            else{ 
               res.render("update",{nav,title:'Library',Bookdata: docs});
            }
        });

    })
    adminRouter.post('/update/:id',upload,function(req,res){
        var updatedData={
                        title:req.body.title,
                        author:req.body.author,
                        genre:req.body.genre,
                        image:req.file.filename,
                    }
        Bookdata.findByIdAndUpdate({_id: req.params.id},{$set: updatedData},(err,docs)=>{
       // Bookdata.findByIdAndUpdate({_id: req.params.id},  (err,docs)=>{
            if(err){
                console.log("error");
                
            }
            else{
                
                res.redirect('/books');
            }
        })
    })

   

adminRouter.get('/delete/:id',function(req,res){
    Bookdata.findByIdAndDelete({_id: req.params.id},(err,docs)=>{
        if(err){
            console.log("went wrong");
        }
        else{
            console.log("deleted");
            res.redirect('/books');
        }
    })
}) 
    return adminRouter; 
}


module.exports=router;
