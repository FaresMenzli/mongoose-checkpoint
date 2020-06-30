const express=require('express')
const app=express()
const mongoose=require('mongoose') 
const connectDB = require('./config/connectDB')
const Person =require("./Models/Person")
const { urlencoded, query } = require('express')

const newPerson = new Person ({
    name:"fares",
    age:"29",
    favoriteFoods:["a","b","c"]})
//4 bodyparser

 //instance
        //add
    
    app.post("/",(req,res)=>{
     newPerson.save((err, data)=> {
        if (err) console.error(err)
        else { console.log(data) 
            res.send(data)
        }
    })
    })

    //add multiple
    app.post("/addm",(req,res)=>{

        Person.create([{
            name:"person multiple1",
            age:"2",
            favoriteFoods:["a","b","c"]},
            {
                name:"person multiple2",
                age:"7",
                favoriteFoods:["a","b","c"]},
                {
                    name:"person multiple3",
                    age:"85",
                    favoriteFoods:["a","b","c"]}],(err, data)=> {
                        console.log(data)
                        res.send(data)
                    })

                    
        

    })



    //search
app.get('/list',(req,res)=>{

    console.log("getting list")
    Person.find({})
    .then(doc=>{
        console.log(doc)
        res.send(doc)
    })
    .catch(err=>{
        console.error(err)
    })

})
    //search by food
    app.get('/searchbyfood/:food',(req,res)=>{

        let food = req.params.food;
        console.log( food)
       
        Person.findOne({favoriteFoods:food})
        .then(doc=>{
            console.log(doc)
            res.send(doc)
        })
        .catch(err=>{
            console.error(err)
        })
    
    })

    //findbyid

    app.get('/findbyid/:id'),(req,res)=>{
        
        let id = req.params.id;
        console.log(id)
        Person.findById("5ef31118bd07d56738fdb2f6", function (err, data) {


        });
    } 
    //classic update

    app.put('/classicupdate',(req,res)=>{
        let querry={_id:"5ef3114a343b734a58e2bb7e"}
        let update=
             {
              
              $push:{"favoriteFoods" :"Hamburger"}

             }

           Person.update(querry,update) 
           .then(doc=>{
                let x = doc
                console.log(doc)
                /* res.send(doc) */  })
             
        
              Person.findOne(querry) 
              .then(doc=>{
                
                doc.save()
                 res.send(doc)  })
      
            

})
 

    // new update
    app.put("/newupdate", (req,res)=>{
        let querry={name:"fares"}
        let update=
             {
              
              $set:{"age" :"20"}

             }
             Person.findOneAndUpdate(querry,update)
             .then(doc=>{
                console.log(doc)
                res.send(doc)
             })

    })
    // remove
    app.delete("/remove", (req,res)=>{

        Person.findOneAndRemove({_id:"5ef3172671784c710401a153"})
        
            .then(doc=>{
                console.log(doc)
                res.send(doc)
             } )
        

            
        
    })
    // remove many

 app.delete("/removemany", (req,res)=>{
     Person.remove({name:"person multiple1"})
     .then(doc=>{
        console.log(doc)
        res.send(doc)
     })
 })

 //query building
 app.get("/chain", (req,res)=>{
     Person.find({favoriteFoods:"Hamburger"})
     .sort({name:1})
     .limit(2)
     .select({age:false})
     .exec((err,data)=>{
         err ? console.error(err):res.send(data)
     })
 })
        
   


//2 connect db
connectDB();

//1 run the server

app.listen(1406,(err)=>{ 
    err ? console.error(err) : console.log("the server is running")
})