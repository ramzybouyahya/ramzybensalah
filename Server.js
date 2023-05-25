const express = require("express");
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
const quiz = require("./models/Quiz");


const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:true}))


mongoose.connect("mongodb://127.0.0.1:27017/").then(()=>{
      console.log("hi")
}).catch(()=>{
      console.log("error")
})

app.get("/",(req,res)=>{
      res.send("hello")
})

app.post('/insert',async (req,res)=>{
      const name = req.body.name;
      const email=req.body.email;
      const score=req.body.score;
      if(!name || !email || !score){
            return res.json({error:"you need to enter all data"})
      }
      const newuser = await quiz({name,email,score}).save();
      return res.json(newuser);
});

app.get('/quiz',async(req,res)=>{
      const getall = await quiz.find();
      return res.json(getall);
});

app.use(function (req, res, _) {
      res.status(500).json({ error: "Route not found" });
});

app.listen(port,()=>{
      console.log("Server is now running on PORT 3000");
});

