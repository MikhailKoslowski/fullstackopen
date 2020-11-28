const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(blog.likes === undefined){
    blog.likes = 0;
  }

  if(blog.title === undefined && blog.url === undefined)
  {
    response.status(400).end()
    return
  }

  const result = await blog.save()
  response.status(201).json(result)
})

// delete single id
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)  
  response.status(204).end()
})

// update a single blog.
blogsRouter.put('/:id', async (request, response) => {
  const b = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
  }

  let blog = await Blog.findByIdAndUpdate(request.params.id, b, { new: true, runValidators:true, context: 'query' })
  response.json(blog)  
})


module.exports = blogsRouter