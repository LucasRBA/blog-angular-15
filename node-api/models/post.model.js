module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            author: String,
            title: String,
            image: String,
            content: String         
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Post = mongoose.model("post", schema)
  
    return Post;
  };