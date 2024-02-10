const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, "social", (err, decoded)=>{
            if(err){
                res.send("Token is wrong or expired")
            }else{
                console.log(decoded)
                req.body.userId = decoded.userID
                next()
            }
        })
    }else{
        res.send("Please Login, token is missing")
    }
}

module.exports = {auth}