const express=require('express');
const app= express();
const port=process.env.PORT || 5000;

const navbar=[
    {
        link:'/signin',
        name:'Sign In'
    },
    {
        link:'/signup',
        name:'Sign Up'
    }
]
const nav=[
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Authors'
    },
    {
        link:'/admin',
        name:'Add Book'
    },
    {
        link:'/addauthor',
        name:'Add Author'
    }
    

]

const signinRouter=require('./src/routes/signinRoutes')(nav)
const signupRouter=require('./src/routes/signupRoutes')(nav)
const indexRouter=require('./src/routes/indexRoutes')(nav)
const booksRouter=require('./src/routes/bookRoutes')(nav)
const authorRouter=require('./src/routes/authorRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)
const addRouter=require('./src/routes/addRoutes')(nav)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use('/signin',signinRouter)
app.use('/signup',signupRouter)
app.use('/index',indexRouter)
app.use('/books',booksRouter)
app.use('/authors',authorRouter)
app.use('/admin',adminRouter)
app.use('/addauthor',addRouter)

app.get('/',function(req,res){
    
    res.render("first",
    {
        navbar,
        title:'Library'
    }
    );
});


app.listen(port,()=>{console.log("Server Ready at" + port)});