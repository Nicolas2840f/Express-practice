const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((Blogs) => {
    response.json(Blogs);
  });
});

blogRouter.get("/:id", (request, response) => {
    Blog.findById(request.params.id).then((Blog) => {
      response.json(Blog);
    });
  });

blogRouter.post("/", (request, response,next) => {
  const body = request.body;
  console.log(request.params)
  if (body.title === undefined) {
    return response.status(400).json({ error: "title missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  });

  blog.save()
  .then((savedBlog) => {
    response.json(savedBlog);
  })
  .catch(error => next(error));
});

module.exports = blogRouter