const express = require("express")
const app = new express()
app.use(express.urlencoded({
    extended:true
}));
const session = require('express-session');
const userData= require('./src/model/UserData')

 var port=process.env.PORT ||2000;

    const nav_admin=[{link:'/admin/books',name:'Books'},{link:'/admin/authors',name:'Authors'},{link:'/admin/addbooks',name:'Add Books'},
    {link:'/admin/addauthors',name:'Add Author'}]
    const nav_user=[{link:'/user/books',name:'Books'},{link:'/user/authors',name:'Authors'}]
    const navright_login=[{link:'/signout',name:'SignOut'}]
    const navright=[{link:'/login',name:'Login'},{link:'/signup',name:'SignUp'}]

//const userRouter=require('./src/routes/userRoutes')(nav_user,navright_login)
//const adminRouter=require('./src/routes/adminRoutes')(nav_admin,navright_login)
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.static('./public'))
//app.use('/user',userRouter)
//app.use('/admin',adminRouter)
app.use(session({secret: "dfdfdfdfdeggghfdfd",resave: false,
saveUninitialized: false}));


app.get('/',function(req,res){
    if(req.session.user!=null){
        console.log(req.session.user)
        res.redirect("/user")
    }
    else if(req.session.admin!=null){
        res.redirect("/admin")
    }
   else{
        res.render("index",
    {
        navright,
        title:'Library',
        show:false
    })
    }
    
})



app.post('/',function(req,res){
    userData.findOne({email:req.body.email, password:req.body.pwd})
        .then(function(user){
         if(user!=null){       
            req.session.user=user;
            console.log(req.session.user)
            req.session.userRouter=require('./src/routes/userRoutes')(nav_user,navright_login)
            app.use('/user',req.session.userRouter)
            res.redirect("/user")           
         }
        else if(req.body.email=="admin123@gmail.com" && req.body.pwd=="Admin123"){
            console.log("Admin")
            req.session.admin="admin"
            const adminRouter=require('./src/routes/adminRoutes')(nav_admin,navright_login)
            app.use('/admin',adminRouter)
            res.redirect("/admin")
           }
           else{
            res.render("login",{
                navright,
                title:'LogIn',
                err:"Invalid Credentials"
            })
           }
        })


})

app.get('/login',function(req,res){
    res.render("login",
    {
        navright,
        title:'LogIn',
        err:null
    })
})

app.get('/signup',function(req,res){
    res.render("signup",
    {
        navright,
        title:'SignUp',
        err:null
    })
})

app.post('/signup',function(req,res){
    var item={
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        password: req.body.pswd,
     }

     userData.findOne({email:item.email})
     .then((user)=>{
         if(user!=null){
            res.render('signup',{
                navright,
                title:'SignUp',
                 err:"This email is already taken"
             })
         }
         else{
            var user=userData(item)
            user.save((err)=>{
               if(err){}
               else{
                 res.redirect('/login')
               }
            })
         }
     })
         
})

app.get('/signout',function(req,res){
    if(req.session.user){
        console.log(req.session.userRouter)
        req.session.destroy();
        res.redirect('/')
    }
    else{
        req.session.destroy();
        res.redirect('/')
    }
})
// app.listen(5555);

 app.listen(port,()=>{
 console.log("server ready at "+port)
 })