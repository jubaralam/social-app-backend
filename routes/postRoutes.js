const express = require("express")
const postRoute = express.Router()
const {PostModel} = require("../model/postModel")
const {auth} = require("../middleware/auth.middleware")
postRoute.get("/", async(req, res)=>{
    try {
        const data = await PostModel.find()
        res.send(data)
    } catch (error) {
        
    }
})

postRoute.post("/add",auth, async(req, res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.send("New Post has been created")
    } catch (error) {
        res.send(error)
    }
})

postRoute.patch("/update/:postId", auth, async(req, res)=>{
const {postId} = req.params
console.log(postId)
try {
    const post = await PostModel.findByIdAndUpdate({_id:postId}, req.body)
    res.send({"msg":`post has been updated of this id ${postId}`})
} catch (error) {
    res.send({"msg": error})
}
})

postRoute.delete("/delete/:postId", auth, async(req, res)=>{
    const {postId} = req.params;
    try {
      const deletePost = await PostModel.findByIdAndDelete({_id:postId})  
      res.send({"msg":`${postId} post has been deleted`})
    } catch (error) {
        res.send({"msg":error})
    }
})
module.exports = {
    postRoute
}