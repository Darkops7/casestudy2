const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true });
const schema=mongoose.Schema;
const BookSchema = new schema({
    title: String,
    author:String,
    genre:String,
    description:String,
    image:{
        data: Buffer,
        contentType: String
    }
})
const bookData=mongoose.model('bookdata',BookSchema)

module.exports=bookData