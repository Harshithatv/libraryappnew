const express=require('express');
const booksRouter=express.Router();
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
    /*var books=[
        {
            title:'Tom And Jerry',
            author:'Joseph Barbera',
            genre:'Cartoon',
            img:"tom.jpg"
        },
        {
            title:'Harry Potter',
            author:'J K Rowling',
            genre:'Fantasy',
            img:"harry.jpg"
        },
        {
            title:'The Alchemist',
            author:'Paulo Coelho',
            genre:'Novel',
            img:"alchemist.jpg"
        },
        {
           title:'The Diary of a Young Girl',
           author:'Anne Frank', 
           genre:'Autobiography',
           img:"anne.jpg"
        },
        {
            title:'To Kill a Mockingbird',
            author:'Harper Lee', 
            genre:'Fiction',
            img:"mockingbird.jpg"
        },
        {
            title:'Wings of Fire',
            author:'A P J Abdul Kalam', 
            genre:'Autobiography',
            img:"wings of fire.jpg"  
        }
          
        
    
    ]*/
    booksRouter.get('/',upload,function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
                nav,
                title:'Library',
                books
            }
            );
        })
       
    });
    booksRouter.get('/:id',upload,function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render("book",
            {
                nav,
                title:'Library',
                book
            });
        })  
    
    });
   
    
    return booksRouter;

}

module.exports=router;