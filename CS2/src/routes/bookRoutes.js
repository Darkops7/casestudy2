const express = require("express")
const booksRouter=express.Router()
const bookData=require('../model/BookData')

function router(nav,navright,homelink){

   /* var books= [
        {title:'Tom and Jerry',author:'Joseph Barbera',genre:'cartoon',img:'Tom.jpg',description:"Tom and Jerry is an American animated media franchise and series of comedy short films created in 1940 by William Hanna and Joseph Barbera. Best known for its 161 theatrical short films by Metro-Goldwyn-Mayer, the series centers on the rivalry between the titular characters of a cat named Tom and a mouse named Jerry. Many shorts also feature several recurring characters."},
        {title:'Harry Potter',author:'JK Rowling',genre:'fantasy',img:'harry.jpg',description:"Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people)."}
    ]*/
    booksRouter.get('/',function(req,res){
      if(req.session.user){
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
        if(req.session.user){
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