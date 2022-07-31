const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let blogContent = {"Day 1" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lacinia neque. Sed ullamcorper pharetra porttitor. Praesent auctor arcu mauris, id pellentesque lorem suscipit ac. Sed posuere ipsum dui, sed commodo erat porttitor quis. Nulla ante neque, hendrerit ut feugiat a, elementum a mauris. In vulputate justo ut enim interdum, in ullamcorper quam facilisis. Mauris ut luctus nibh.",
"Day 2" : "Suspendisse vel rutrum nisi. Nunc mattis, est eget consequat iaculis, neque sem aliquam metus, eget bibendum mauris nisi eget est. Morbi sodales a nulla et ultrices. In ultrices fringilla dignissim."}
const blogUrl = require(__dirname + "/titleUrl.js")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get ("/", function (req, res) {
  res.render("homepage", {title: "Linda's Blog", blogContent: blogContent})
})

app.get("/about", function(req, res) {
  res.render("about", {title: "About"})
})

app.get("/contact", function(req, res) {
  res.render("contact", {title: "Contact"})
})

app.get("/compose", function(req, res) {
  res.render("compose", {title: "Compose"})
})

app.post("/", function(req, res) {
  let title = req.body.title;
  let content = req.body.content;
  //add the title and content to the blogContent object
  blogContent[title] = content;
  // Create a new page for the new blog created
  let titleUrl = blogUrl.getTitleUrl(title)

  app.get(titleUrl, function(req, res){
    res.render("blog", {title: "Blog", blogTitle:`${title}`, blog: `${blogContent[title]}`})
  })
  res.redirect("/")

})

for (const title in blogContent) {
  let titleUrl = blogUrl.getTitleUrl(title)
  app.get(titleUrl, function(req, res){
    res.render("blog", {title: "Blog", blogTitle:`${title}`, blog: `${blogContent[title]}`})
  })
}


app.listen(process.env.PORT ||3000, function() {
  console.log("Blog Website running on port 3000")
})
