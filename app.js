//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to DAILY DOSE OF HELLY, your daily dose of inspiration, information, and innovation! Each day, we bring you captivating stories, insightful articles, and practical tips that aim to enlighten, entertain, and empower. Our diverse range of topics—from lifestyle and wellness to technology and travel—ensures that there's something for everyone. Dive into our vibrant community, engage with thought-provoking content, and discover a space where your curiosity can thrive. Join us on this journey of daily discovery and let's explore the world together, one blog post at a time.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const aboutContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringi";
const app = express();
const posts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/BloggingDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}).then((data) => {
    res.render("home", {
      data1: homeStartingContent,
      post: data
      });
  });
});

app.get("/about",function(req,res){
  res.render("about",{AboutYou: aboutContent});
});


const UserSchema = {
  email: String,
  password: String
};

const User = mongoose.model("User", UserSchema);


app.get("/signup",function(req,res){
  res.render("signup");
});

app.post("/signup",function(req,res){
  // console.log(req.body);
  const user = new User({
    email: req.body.emailadd,
    password: req.body.passwrd,
  });
  user.save();
  res.redirect("/");
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:title",function(req,res){
  const postTitle=_.lowerCase(req.params.title);
  Post.findOne({title: req.params.title}).then((data) =>
  {
    // console.log(data);
    res.render("post",{Title: data.title,Content: data.content});
  });
});

app.route("/articles/:articleTitle")
.get(function(req,res){
  Article.findOne({title: req.params.articleTitle}).then((data) => {
  res.send(data);
});
})

app.post("/compose",function(req,res){
  const pst= new Post({
    title: req.body.postTitle,
    content: req.body.content,
  });
  pst.save();
  res.redirect("/");
});

app.get("/contact",function(req,res){
  res.render("contact",{contactdata: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
