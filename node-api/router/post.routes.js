module.exports = app => {
    const posts = require("../controller/post.controller");
  
    var router = require("express").Router();
  
    // Create a new post
    router.post("/", posts.create);
  
    // Retrieve all posts
    router.get("/", posts.findAll);
  
    // Retrieve all published posts
    router.get("/anonymous", posts.findAllAnonymous);
  
    // Retrieve a single post with id
    router.get("/:id", posts.findOne);
  
    // Update a post with id
    router.put("/:id", posts.update);
  
    // Delete a post with id
    router.delete("/:id", posts.delete);
  
    // Delete all posts
    router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };