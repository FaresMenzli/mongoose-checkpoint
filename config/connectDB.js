const mongoose=require('mongoose')
const config =require('config')
const Mongo_URI = config.get("MONGO_URI")

const connectDB = ()=>{
mongoose.connect(Mongo_URI, 
    { 
        useNewUrlParser: true,
        
         useUnifiedTopology: true 
    },
    (err) =>(err ?console.error(err) : console.log("mongoose connected"))
    ); 
}
module.exports=connectDB;

