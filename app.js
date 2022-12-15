const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const postModal = require("./postmodal");
const app = express()


app.use(express.json({limit:"30mb",extended:true}))

app.use(cors())

app.listen(process.env.PORT || 3002, (err)=>{
    if(!err){
        console.log("Server is started at 3002")
    }else(
        console.log(err)
    )
});
//"mongodb://localhost/instaclone"
const mongodb = "mongodb+srv://Sakshi09:test123@instaclone.gwk4cly.mongodb.net/instaclone?retryWrites=true&w=majority"
mongoose.connect(mongodb,(data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});

// app.get("/",(re))
app.get("/images",(req,res)=>{
    postModal.find().then((data)=>{
        res.status(200).send({images: data})
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

app.post("/uploads",(req,res)=>{
    console.log(req.body)
    var today= new Date()
    var options ={
        day: "numeric",
        month:"long",
        year: "numeric",
        time: "numeric"
    }
    var setday = today.toLocaleDateString("en-US", options)
    console.log(setday)
    postModal.create({
    author : req.body.author,
    location : req.body.location,
    image : req.body.image,
    likes : req.body.likes,
    date : setday,
    description : req.body.description
  }).then((post)=>{
    res.status(200).send(post)
  }).catch((err)=>{
    res.status(400).send(err)
  })
})
app.put('/like/:_id', async(req,res)=>{
    try{
        await postModal.updateOne({
            $and :[
                {_id: {$eq : req.params._id}}
            ]
        },
        {
            $set:{
                likes : req.body.likes
            }
        });
        res.status(200).json({
            status:"success",
            message:"updated succefully"
          })
    }
    catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})

app.get("/",(req,res)=>{
    res.send("INSTA CLONE")
})
app.delete("/remove/:_id",(req,res)=>{
    postModal.find({_id: req.params._id}).then(()=>{
        try{
            postModal.deleteOne({_id: req.params._id}).then((post)=>{
                console.log("post deleted  successfully")
                res.status(200).send("Post Deleted")

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("Post Deleted")
            })
        }catch(err){
            res.status(400).send("Not find")
        }
    })
})
//working server
