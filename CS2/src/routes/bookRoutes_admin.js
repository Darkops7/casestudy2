const express = require("express")
const booksRouter=express.Router()
const bookData=require('../model/BookData')

function router(nav,navright,homelink){

    booksRouter.get('/',function(req,res){
        if(req.session.admin){
            bookData.find()
            .then(function(books){
             res.render("books",
             { 
                 nav,navright,homelink,
                 title:'Books',
                 books
             })
     
            })
        }
        else{
            res.redirect('/')
        }
       
        
    })
    
    booksRouter.get('/:id',function(req,res){
        const id=req.params.id

        if(req.session.admin){
            bookData.findOne({_id:id})
            .then(function(book){
                res.render("book",
           {
           nav,navright,homelink,
           title:book.title,
           book
           }
           )
            })
        }
        else{
            res.redirect('/')
        }
       
    })
    
   return booksRouter
}

module.exports=router