const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const port = 8080;
// for making data in requrest understandable to ejs 
app.use(express.urlencoded({express: true}));

const path = require("path");

app.set("view engine", "ejs");
// views is correct not view 
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   id : uuidv4(),
        username : "TejasSurse",
        Content : "I love Coding ! ",
    },
];
app.get("/posts", (req, res)=>{
   res.render("index.ejs", {posts});
   // res.send("Server is working ");
});
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts/new", (req,res)=>{
    let {username, Content} = req.body;
    let id = uuidv4();
    posts.push({id,username, Content});
    console.log(req.body);
    res.redirect("/posts");
    res.send("Post is submitted ");
});
app.get("/", (req, res)=>{
    res.send("Server is started !..");
});
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find( (p) => id===p.id);
    console.log(post);
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let NewContent = req.body.Content;
    let post = posts.find((p) => id === p.id);
    post.Content = NewContent;
    console.log(post);
   // res.send("Patch req working ");
    res.redirect("/posts");
});

app.get("/posts/:id/edit" ,(req, res)=>{
    res.render("edit.ejs");
});
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id!= p.id);
    res.redirect("/posts");
})
app.listen(port, ()=>{
    console.log("Server is started ");
});