const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require("lodash");
const blogUrl = require(__dirname + "/titleUrl.js")

let aboutContent = "Nullam sit amet ipsum ut orci lobortis ultrices in eget eros. Nam eros velit, aliquam eget feugiat dapibus, varius vel metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis fermentum non mauris idsuscipit. Phasellus nec iaculis tortor, id fringilla tortor. Suspendisse at condimentum ante. Sed sit amet fermentum diam. Curabitur hendrerit magna metus, a varius nisi tempus at. Pellentesque habitant morbi tristique senectus et netus etmalesuada fames ac turpis egestas. Phasellus lacinia pretium erat id eleifend. Suspendisse vitae auctor felis. Morbi id lacus pharetra, tempor tortor et, bibendum ligula. Sed lobortis lorem ex, vitae rhoncus libero bibendum vitae. Phasellusdignissim arcu id lectus elementum, volutpat fringilla lacus volutpat. Curabitur tincidunt nisi tortor, dictum vulputate metus bibendum ac. Mauris eget orci porta, mollis nulla nec, accumsan ante."
let contactContent = "Aliquam porttitor est quis mi suscipit lacinia. Ut sagittis, velit porta blandit mollis, quam elit consectetur erat, non faucibus elit est in lacus. Fusce elementum orci eget eros congue lacinia. Duis est ex, elementum ac odio viverra, aliquet aliquam risus. Nunc scelerisque nisl in molestie egestas. Donec at pretium nulla. Ut at rutrum metus. Aliquam pulvinar cursus nulla sit amet maximus. Donec fringilla laoreet mattis. Fusce scelerisque urna nec tellus malesuada, a vehicula velit consequat. Cras mi metus, condimentum eu vestibulum sit amet, aliquam ut dolor. Nunc posuere, erat vel finibus elementum, mauris ipsum commodo lacus, ac euismod ante velit quis urna. Maecenas sagittis dolor nunc, quis gravida lectus sollicitudin vitae. Mauris faucibus erat non nulla efficitur accumsan."
let homeContent = "Duis gravida ac mi vel dignissim. Aliquam tincidunt a ligula et commodo. Pellentesque in tortor congue, lobortis orci ut, tempor nulla. Morbi sit amet accumsan ante. Nullam non nibh eu enim fringilla auctor. Aliquam at mattis ipsum. Pellentesque quis mi at odio vestibulum faucibus. Etiam posuere mattis tristique. Phasellus quis commodo metus, ac dictum tellus. Nunc arcu est, lacinia nec ex ac, vulputate tempus enim. Aenean facilisis consequat vulputate. Maecenas at tortor in felis accumsan sagittis nec sed dui. Donec malesuada euismod lectus ac venenatis. Nullam feugiat nulla eget consequat convallis."

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
