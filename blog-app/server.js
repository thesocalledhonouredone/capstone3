const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View Engine
app.set("view engine", "ejs");

// In-memory storage (no database)
const posts = [];

// Home Page - Shows previews of posts
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// New Post Form Page
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Post (Handle Form Submission)
app.post("/create", (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect("/");
});

// View a specific post
app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    if (posts[postId]) {
        res.render("post", { post: posts[postId] });
    } else {
        res.status(404).send("Post not found");
    }
});

// Delete a Post
app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
