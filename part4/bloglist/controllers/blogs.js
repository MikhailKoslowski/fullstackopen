const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const decodeToken = token => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken
  } catch (error) {
    return undefined
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(blog.likes === undefined) {
    blog.likes = 0;
  }

  if(blog.title === undefined && blog.url === undefined) {
    response.status(400).end()
    return
  }

  const token = request.token
  const decodedToken = decodeToken(token)
  if (!token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user === undefined) {
    response.status(400).send({error: "no user exists"})
    return
  }

  blog.user = user._id

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()


  response.status(201).json(savedBlog)
})

// delete single id
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)  
  response.status(204).end()
})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
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