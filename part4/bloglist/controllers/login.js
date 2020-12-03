const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  
  const body = request.body

  // check if user exists.
  const user = await User.findOne({username: body.username})

  // if user exists, check if password is correct
  const passwordCorrect = 
    user === null ? false :
    await bcrypt.compare(body.password, user.passwordHash)

  // if any is invalid, answer with a NotAuthorized 
  if (!(user && passwordCorrect)) {
    return response.status(401).json({error: 'invalid username or password'})
  }

  // else create the login token and send it back.
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  response.status(200)
    .send( {token, username: user.username, name: user.name})
  
})

module.exports = loginRouter