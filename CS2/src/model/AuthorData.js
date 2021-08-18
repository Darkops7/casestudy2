const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true });
const schema=mongoose.Schema;
const AuthorSchema = new schema({
    title: String,
    period:String,
    genre:String,
    description:String,
    image:{
        data: Buffer,
        contentType: String
    }
})
const authorData=mongoose.model('authordata',AuthorSchema)

module.exports=authorData