const express=require('express')
const router=express.Router()
const Person = require('../Models/Person')

const newPerson = new Person ({
name:"fares",
age:"29",
favoriteFoods:["a","b","c"]})

router.post("/",(req,res)=>{


newPerson.save((err, data)=> {
    if (err) console.error(err)
    else console.log(data)
})
})

module.exports

/* 

    const {name , age , favoriteFoods}=req.body
    const newPerson = new Person ({name , age , favoriteFoods}) 
 */
