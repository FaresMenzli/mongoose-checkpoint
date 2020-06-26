const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema ({
    name:String,
    age:Number,
    favoriteFoods:[String]
})
module.exports=mongoose.model('person',PersonSchema)