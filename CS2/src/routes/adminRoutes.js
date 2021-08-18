const express=require('express')
const adminRouter=express.Router()
const multer = require("multer")
var imagedest= __dirname.replace('src\\routes','public\\images')
var upload = multer({ dest: imagedest });
const fs = require('fs')
const bookData= require('../model/BookData')
const authorData= require('../model/AuthorData')


function router(nav,navright){
    const homelink="/admin"
    const booksRouter=require('./bookRoutes_admin')(nav,navright,homelink)
    const authorsRouter=require('./authorRoutes_admin')(nav,navright,homelink)
    adminRouter.use('/books',booksRouter)
    adminRouter.use('/authors',authorsRouter)

    adminRouter.get('/',(req,res)=>{
        if(req.session.admin){
            res.render('home',
            {
                nav,navright,homelink,
                title:'Admin Home',
                user:'Admin'
            })
        }
       else{
           res.redirect('/')
       }
        
    })

    adminRouter.get('/addbooks',(req,res)=>{
        if(req.session.admin){
            res.render('addbook',
            {
                nav,navright,
                title:'Add Book',
                mode:'Add'
            })
        }
        else{
            res.redirect('/')
        }
        
    })

    adminRouter.post('/addbooks/add',upload.single('img'),(req,res)=>{
       var item={
        title:req.body.title,
        author:req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        image: {
            data:fs.readFileSync(req.file.path),
            contentType:'image'
        }
     }
     var book=bookData(item)
       book.save((err)=>{
        if(err){}
        res.redirect('/admin/books')
       })
      
    })

    adminRouter.get('/addbooks/delete/:id',(req,res)=>{
        const id=req.params.id
        bookData.deleteOne({_id:id}).then(()=>{
            res.redirect('/admin/books')
        })
    })

    adminRouter.get('/addbooks/update/:id',(req,res)=>{
      const id=req.params.id
      bookData.findOne({_id:id}).then((book)=>{
        res.render('addbook',
        {
            nav,navright,
            title:'Add Book',
            book, mode:'Update'
        })
      })
  })

  adminRouter.post('/addbooks/update/:id',upload.single('img'),(req,res)=>{
    const id=req.params.id
    var item={
      title:req.body.title,
      author:req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      image: {
          data:fs.readFileSync(req.file.path),
          contentType:'image'
      }
   }
   var book=bookData(item)
   bookData.updateOne({_id:id},item)
   .then(()=>{
    res.redirect('/admin/books')
   })

  })

  //Author

  adminRouter.get('/addauthors',(req,res)=>{
      if(req.session.admin){
        res.render('addauthor',
        {
            nav,navright,
            title:'Add Author',
            mode:'Add'
        })
      }
    else{
        res.redirect('/')
    }
    
})

adminRouter.post('/addauthors/add',upload.single('img'),(req,res)=>{
   var item={
    title:req.body.title,
    period:req.body.period,
    genre: req.body.genre,
    description: req.body.description,
    image: {
        data:fs.readFileSync(req.file.path),
        contentType:'image'
    }
 }
 var author=authorData(item)
 author.save((err)=>{
     if(err){}
     res.redirect('/admin/authors')
 })
   

})

adminRouter.get('/addauthors/delete/:id',(req,res)=>{
    const id=req.params.id
    authorData.deleteOne({_id:id}).then(()=>{
        res.redirect('/admin/authors')
    })
})

adminRouter.get('/addauthors/update/:id',(req,res)=>{
  const id=req.params.id
  authorData.findOne({_id:id}).then((author)=>{
    res.render('addauthor',
    {
        nav,navright,
        title:'Update Author',
        author, mode:'Update'
    })
  })
})

adminRouter.post('/addauthors/update/:id',upload.single('img'),(req,res)=>{
const id=req.params.id
var item={
    title:req.body.title,
    period:req.body.period,
    genre: req.body.genre,
    description: req.body.description,
    image: {
        data:fs.readFileSync(req.file.path),
        contentType:'image'
    }
}
var book=authorData(item)
authorData.updateOne({_id:id},item)
.then(()=>{
res.redirect('/admin/authors')
})

})

    return adminRouter

}

module.exports=router