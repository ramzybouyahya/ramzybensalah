const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose  = require("mongoose");
const quiz = require("./models/Quiz");
var port = process.env.PORT || 6200;


const app = express();

app.use(helmet());
app.use(cors);
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function (err) {
      if (err) return console.err(err);
      console.log("Mongoose is connected");
    });

app.post('/insert',async (req,res)=>{
      const name = req.body.name;
      const email=req.body.email;
      const score=req.body.score;
      if(!name || !email || !score){
            return res.json({error:"you need to enter all data"})
      }
      const newuser = await quiz(name,email,score).save();
      return res.json(newuser);
});

app.get('/quiz',async(req,res)=>{
      const getall = quiz.find();
      return res.json(getall);
});

app.use(function (req, res, _) {
      res.status(500).json({ error: "Route not found" });
});

app.listen(port,()=>{
      console.log("Server is now running on PORT 6200");
});
