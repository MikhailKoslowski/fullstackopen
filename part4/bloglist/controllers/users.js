const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { url:1, title:1, author:1, id:1})
  response.json(users)
})

// delete single id
// WARNING: this API is used for testing only! should not be present in production system!
usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndRemove(request.params.id)  
  response.status(204).end()
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(body.password === undefined || body.username === undefined)
  {
    response.status(400).send({error:'username and password should be defined'})
    return
  }

  if(body.password.length < 3)
  {
    response.status(400).send({error:'password should be more than 3 characters long'})
    return
  }
  if(body.username.length < 3)
  {
    response.status(400).send({error:'username should be more than 3 characters long'})
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try
  {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(e)
  {
    next(e)
  }
})

module.exports = usersRouter