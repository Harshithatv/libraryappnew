const express=require('express');
const authorRouter=express.Router();
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
    /*var details=[
        {
            name:'Joseph Barbera',
            famouswork:'Tom And Jerry',
            nationality:'American',
            img:"joseph.jpg"
        },
        {
            name:'Paulo Coelho',
            famouswork:'Alchemist',
            nationality:'Brazilian',
            img:"paulo.jpg"
        },
        {
            name:'Leo Tolstoy',
            famouswork:'Anna Karenina ',
            nationality:'Russian',
            img:"leo.jpg"  
        },
        {
            name:'Kamala Surayya',
            famouswork:'Ente Katha',
            nationality:'Indian',
            img:"kamala.jpg"  
        },
        {
            name:'Vaikom Muhammad Basheer',
            famouswork:'Balyakalasakhi',
            nationality:'Indian',
            img:"basheer.jpg"  
        },
        {
            name:'Arundhati Roy',
            famouswork:'The God of Small Things',
            nationality:'Indian',
            img:"arundhathi.jpg"  
        },
        


    
    ]*/
    authorRouter.get('/',upload,function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
                nav,
                title:'Library',
                authors
            }
            );
        })
       
    });
    authorRouter.get('/:id',upload,function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",
            {
                nav,
                title:'Library',
                author
            });
        })
       
    
    });
    return authorRouter;

}

module.exports=router;