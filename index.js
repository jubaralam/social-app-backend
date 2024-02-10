const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const mongoose = require("mongoose")
const connection = mongoose.connect(process.env.mongoURL)
const {userRoute} = require("./routes/userRoutes")
const {postRoute} = require("./routes/postRoutes")
app.use(express.json())
app.use("/users",userRoute)
app.use("/posts", postRoute)











app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`server is running on port: ${PORT} and db also connected`)
    } catch (error) {
        console.log(error)
    }
})