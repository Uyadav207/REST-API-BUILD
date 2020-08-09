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

//                                                         REQUEST FOR ALL ARTICLES

// CODE PLAY FOR ROUTING PARAMS
app.route("/articles")

.get((req,res) => {
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

.post((req,res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
})

newArticle.save((err)=>{
  if(!err){
    res.send("successfully Added new article")
  } else {
    console.log(err);
  }
  });
})

.delete((req,res)=> {
  Article.deleteMany((err)=>{
    if(!err) {
      res.send("successfully deleted All the articles")
    } else {
      console.log(err);
    }
  })
});

//                                                         REQUEST FOR SPECIFIC ARTICLES


app.route("/articles/:articleTitle")

.get((req,res) => {
  Article.findOne({title: req.params.articleTitle}, (err,foundArticles) => {
    if(foundArticles) {
      res.send(foundArticles)
    }else{
      res.send("SORRY");
    }
  })
})

.put((req,res)=>{
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    (err) =>{
      if(!err) {
        res.send("successfully Saved the Updates.")
      } else {
        res.send("SOrry")
      }
    }
  )
})

.patch(()=>{
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    () => {

    }
  )
})

app.listen(3000, () => {
  console.log("server started at PORT 3000");
})































// // GET REQUEST
// app.get("/articles", (req,res) => {
//   Article.find((err,foundArticles) => {
//     if(!err) {
//       res.send(foundArticles);
//     } else {
//       {
//         console.log(err);
//       }
//     }
//   })
// })
//
//
// // POST REQUEST
// app.post("/articles", (req,res) => {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   })
// // SAVING REQUEST
//   newArticle.save((err)=>{
//     if(!err){
//       res.send("successfully Added new article")
//     } else {
//       console.log(err);
//     }
//   });
// })
//
// // DELETE REQUEST
// app.delete("/articles", (req,res)=> {
//   Article.deleteMany((err)=>{
//     if(!err) {
//       res.send("successfully deleted All the articles")
//     } else {
//       console.log(err);
//     }
//   })
// })
