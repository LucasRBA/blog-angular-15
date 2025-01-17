const db = require("../models");
const Post = db.post;

exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({ message: "Content can't be empty!" });
        return;
      }
    
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        author: req.body.author
      });


      if(!post.author || /^\s*$/.test(post.author) ) {
        post.author = "Anonymous";
        console.log(post.author);
      } else {
        post.author.trim();
      }

    
      post
        .save(post)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Post."
          });
        });
};

exports.findAll = (req, res) => {

    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Post.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Posts."
        });
      });    
};

exports.findOne = (req, res) => {

  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

exports.delete = (req, res) => {

  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });  
};

exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Posts."
      });
    });
};

exports.findAllAnonymous = (req, res) => {
  Post.find({ author : "Anonymous" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    });  
};