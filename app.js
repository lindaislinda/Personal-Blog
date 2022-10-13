const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require("lodash");
const blogUrl = require(__dirname + "/titleUrl.js")

let homeContent = "This Blog Website is hosted by Heroku.\nFront-end technology: EJS, CSS, Bootstrap 5\nBack-end technology: Node.js, Express.js, MongoDB (database)\nThe code can be found at: https://github.com/lindaislinda/Personal-Blog"
let contactContent = "Phone number: +13862792014\nEmail: nguyen133@usf.edu\nGithub: github.com/lindaislinda\nLinkedIn: linkedin.com/in/linda--nguyen/"
let aboutContent = "This website is created by Linda Nguyen - a sophomore majoring in Computer Science at the University of South Florida."

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://linda:disLindaAtlas@cluster0.b0b6hc8.mongodb.net/blogContentDB")
//Create a schema
const blogSchema = {
  name: String,
  content: String
}
//Create a model
const Blog = mongoose.model("Blog", blogSchema)

app.get ("/", function (req, res) {
  Blog.find({}, function(err, foundBlogs) {
      res.render("homepage", {title: "Linda's Blog", homeContent: homeContent, blogContent: foundBlogs})    
  })
})

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Blog.findOne({_id: requestedPostId}, function(err, post){
      res.render("blog", {
        title: "Blog", 
        blogTitle: post.name, 
        blog: post.content,
        blogId: post._id
      });
    });
  
  });


app.get("/about", function(req, res) {
  res.render("about", {title: "About", aboutContent: aboutContent})
})

app.get("/contact", function(req, res) {
  res.render("contact", {title: "Contact", contactContent: contactContent})
})

app.get("/compose", function(req, res) {
  res.render("compose", {title: "Compose"})
})

app.post("/", function(req, res) {
  let title = req.body.title;
  let content = req.body.content;
  //create a new Blog 
  let newBlog = new Blog ({
    name: title,
    content: content
  })
  newBlog.save()
  res.redirect("/")
})

app.post("/delete", function(req,res) {
  let deleteId = req.body.deleteId;
  Blog.findByIdAndRemove(deleteId, function(){});
  res.redirect("/");
})

app.post("/edit", function(req, res) {
  let editId = req.body.editId;
  Blog.findOne({_id: editId}, function(err, foundBlog) {
    res.render("edit", {title: "Edit", blogTitle: foundBlog.name, blogContent: foundBlog.content, blogId : foundBlog._id})
  })
})

app.post("/update", function(req, res) {
  let updatedId = req.body.button;
  let updatedContent = req.body.content;
  let updatedTitle = req.body.title;
  Blog.findByIdAndUpdate(updatedId, {name: updatedTitle, content: updatedContent}, function() {})
  res.redirect("/")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Blog Website running")
})
