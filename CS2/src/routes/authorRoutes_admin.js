const express = require("express")
const authorsRouter=express.Router()
const authorData=require('../model/AuthorData')

function router(nav,navright,homelink){
    
    authorsRouter.get('/',function(req,res){
        if(req.session.admin){
            authorData.find()
            .then(function(authors){
             res.render("authors",
             { 
                 nav,navright,homelink,
                 title:'Authors',
                 authors
             })
     
            })
        }
        else{
            res.redirect('/')
        }
    })
    

    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id
        if(req.session.admin){
            authorData.findOne({_id:id})
            .then(function(author){
           res.render("author",
           {
           nav,navright,
           title:author.title,
           author
           }
           )
        })
        }
        else{
            res.redirect('/')
        }
})
    
   return authorsRouter
}

module.exports=router