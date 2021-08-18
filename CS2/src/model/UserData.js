const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true });
const schema=mongoose.Schema;
const UserSchema = new schema({
    name: String,
    email:String,
    phone:String,
    password:String  
})
const userData=mongoose.model('userdata',UserSchema)

module.exports=userData