const express = require("express")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel} = require("../model/userModel")
userRoute.post("/register",async (req, res)=>{
    const {name, email, gender, password} = req.body
try {
    bcrypt.hash(password, 5, async(err, hash)=>{
        if(hash){

            console.log({password:hash})
            const user = new UserModel({name, email, gender, password:hash})
           await user.save()
           res.send("Registered has been completed")
        }else{
            res.send({"msg":"something went wrong while hashing"})
        }
    })
} catch (error) {
    res.send({"error":error})
}
})

userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    try {
      const user = await  UserModel.findOne({email});
      if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(result){
                const token = jwt.sign({userID:user._id},"social")
                res.send({"msg":"you have successfully logged in", "token":token})
            }else{
                res.send("your password is wrong please try again ")
            }
        })
      }
    } catch (error) {
        
    }
})


module.exports = {
    userRoute
}