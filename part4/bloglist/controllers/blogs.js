const blogsRouter = require('express').Router()
const { response } = require('express')
const blog = require('../models/blog')
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

module.exports = blogsRouter