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
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://linda:disLindaAtlas@cluster0.b0b6hc8.mongodb.net/blogContentDB")
//Create a schema
const blogSchema = {
  name: String,
  content: String
}
//Create a model
const Blog = mongoose.model("Blog", blogSchema)
//Add Initial Document
const blog1 = new Blog({
  name: "Day 1",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lacinia neque. Sed ullamcorper pharetra porttitor. Praesent auctor arcu mauris, id pellentesque lorem suscipit ac. Sed posuere ipsum dui, sed commodo erat porttitor quis. Nulla ante neque, hendrerit ut feugiat a, elementum a mauris. In vulputate justo ut enim interdum, in ullamcorper quam facilisis. Mauris ut luctus nibh."
})
const blog2 = new Blog({
  name: "Day 2",
  content: "Suspendisse vel rutrum nisi. Nunc mattis, est eget consequat iaculis, neque sem aliquam metus, eget bibendum mauris nisi eget est. Morbi sodales a nulla et ultrices. In ultrices fringilla dignissim."
})
const defaultBlogContent = [blog1, blog2]


app.get ("/", function (req, res) {
  Blog.find({}, function(err, foundBlogs) {
    //Add the defaultBlogContent to foundBlogs if it is empty
    if (foundBlogs.length === 0) {
      Blog.insertMany(defaultBlogContent, function(err){
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully saved default items to the database")
        }
      })
      res.redirect("/")
    } else {
      res.render("homepage", {title: "Linda's Blog", homeContent: homeContent, blogContent: foundBlogs})
      foundBlogs.forEach(function(blog) {
        let titleUrl = blogUrl.getTitleUrl(blog.name)
        app.get(titleUrl, function(req,res) {
          res.render("blog", {title: "Blog", blogTitle: blog.name, blog: blog.content})
        })
      })
    }
  })
})

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


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Blog Website running")
})
