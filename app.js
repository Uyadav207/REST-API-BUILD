const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true })

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema)

// CODE PLAY FOR ROUTING PARAMS

// GET REQUEST
app.get("/articles", (req,res) => {
  Article.find((err,foundArticles) => {
    if(!err) {
      res.send(foundArticles);
    } else {
      {
        console.log(err);
      }
    }
  })
})

// POST REQUEST
app.post("/articles", (req,res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })

// Saving
  newArticle.save((err)=>{
    if(!err){
      res.send("successfully Added new article")
    } else {
      console.log(err);
    }
  });
})



app.listen(3000, () => {
  console.log("server started at PORT 3000");
})
