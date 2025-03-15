const express = require("express");
const app = express();

app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.static("public")); // Serve static files (CSS, JS, images)

const posts = []; // In-memory storage for blog posts

// Home Route (Show All Posts)
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New Post Page
app.get("/new", (req, res) => {
  res.render("new");
});

// Create Post (POST request)
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
const postId = req.params.id;
posts.splice(postId, 1); // Remove the post from the array
res.redirect("/");
});
  
// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
