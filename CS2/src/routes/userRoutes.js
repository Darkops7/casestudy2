const express=require('express')
const userRouter=express.Router()


function router(nav,navright){
    const homelink="/user"
    const booksRouter=require('./bookRoutes')(nav,navright,homelink)
    const authorsRouter=require('./authorRoutes')(nav,navright,homelink)
    userRouter.use('/books',booksRouter)
    userRouter.use('/authors',authorsRouter)
    

    userRouter.get('/',(req,res)=>{
        if(req.session.user){
        var user=req.session.user.name
        res.render('home',
        {   
            nav,navright,homelink,
            title:'User Home',
            user
        })
    }
    else{
        res.redirect('/')
    }
        
    })


    return userRouter

}

module.exports=router
