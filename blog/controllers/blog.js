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

blogRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes + 1
  };


  Blog.findByIdAndUpdate(request.params.id, updatedBlog,{new:true,runValidators:true,context:'query'})
    .then((updatedBlog) => {
      if (updatedBlog) {
        response.json(updatedBlog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = blogRouter