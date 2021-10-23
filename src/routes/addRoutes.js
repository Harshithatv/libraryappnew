const express=require('express');
const addRouter=express.Router();
const Authordata=require('../model/Authordata');
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
    addRouter.get('/',function(req,res){
        res.render("addauthor",
        {
            nav,
            title:'Library',
            msg:''
            
        })
    })
    addRouter.post('/add',upload,function(req,res){
        var item={
            name:req.body.name,
            famouswork:req.body.famouswork,
            nationality:req.body.nationality,
            image:req.file.filename,
        }
        var author=Authordata(item);
        author.save();
        res.redirect('/authors');
     });
     



     addRouter.get('/updateauthor/:id',upload,function(req,res){
        Authordata.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err,docs)=>{
            if(err){
                console.log("error");    
            }
            else{ 
               res.render("updateauthor",{nav,title:'Library',Authordata:docs});
            }
        });

    })
    addRouter.post('/updateauthor/:id',upload,function(req,res){
        var updatedData={
            name:req.body.name,
            famouswork:req.body.famouswork,
            nationality:req.body.nationality,
            image:req.file.filename,
        }
        Authordata.findByIdAndUpdate({_id: req.params.id},{$set: updatedData},(err,docs)=>{

       // Authordata.findByIdAndUpdate({_id: req.params.id}, req.body, (err,docs)=>{
            if(err){
                console.log("error");
                
            }
            else{
                res.redirect('/authors');
            }
        })
    })
    addRouter.get('/delete/:id',function(req,res){
        Authordata.findByIdAndDelete({_id: req.params.id},(err,docs)=>{
            if(err){
                console.log("went wrong");
            }
            else{
                console.log("deleted");
                res.redirect('/authors');
            }
        })
    }) 

    return addRouter; 
}
module.exports=router;
