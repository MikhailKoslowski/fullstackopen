const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { initialBlogs } = require('./test_helper')

describe('blog api', () => {

  token = ''

  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
      let blogObj = new Blog(blog)
      await blogObj.save()
    }

    await User.deleteMany({})

    const u = {
      "username":"root",
      "name":"root",
      "password":"T0P53CR3T"
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(u.password, saltRounds)

    const user = new User({
      username: u.username,
      name: u.name,
      passwordHash
    })

    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    token = jwt.sign(userForToken, process.env.JWT_SECRET)
  })

  test('get all', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    
    for (let blog of response.body )
    {
      expect(blog.id).toBeDefined()
    }
  })

  test('post works', async () => {
    const blog = {
      title: "Test Blog",
      author: "Mikhail",
      url: "http://localhost",
      likes: 0
    }
    
    // get blogs length
    let response = await api.get('/api/blogs')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(201)

    // except for the id and user, they should be equal.
    blog.id = response.body.id
    blog.user = response.body.user
    expect(response.body).toEqual(blog)

    // get new len.
    response = await api.get('/api/blogs')
    const afterLen = response.body.length

    expect(afterLen).toEqual(beforeLen + 1)
  })

  test('post with no likes equals 0 likes', async () => {
    const blog = {
      title: "Test Blog",
      author: "Mikhail",
      url: "http://localhost",
    }
    
    // post
    const response = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(201)

    expect(response.body.likes).toEqual(0)

  })

  test('Missing title and url blogs returns 400', async () => {
    const blog = {
      author: "Mikhail",
      likes: 0
    }
    
    // post
    const response = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(400)    
  })

  test('Delete a single blog works', async () => {
    const blog = {
      title: "Test Blog to be deleted",
      author: "Mikhail",
      url: "http://localhost",
      likes: 0
    }
    
    // get blogs length
    let response = await api.get('/api/blogs')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(201)

    // except for the id and user, they should be equal.
    blog.id = response.body.id
    blog.user = response.body.user
    expect(response.body).toEqual(blog)

    // get new len.
    response = await api.get('/api/blogs')
    let afterLen = response.body.length

    expect(afterLen).toEqual(beforeLen + 1)

    // now deletes
    response = await api.delete('/api/blogs/' + blog.id)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(204)

    // get new len.
    response = await api.get('/api/blogs')
    afterLen = response.body.length

    expect(afterLen).toEqual(beforeLen)
  })

  test('Update single blog works', async () => {
    let blog = {
      title: "Test Blog to be updated",
      author: "Mikhail",
      url: "http://localhost",
      likes: 0
    }
    
    
    // post
    let response = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(201)

    // except for the id and user, they should be equal.
    blog.id = response.body.id
    blog.user = response.body.user
    expect(response.body).toEqual(blog)

    blog.likes += 1;

    response = await api.put('/api/blogs/' + blog.id)
      .send(blog)
      .expect(200);

    expect(response.body.likes).toEqual(1)

        // now deletes
    response = await api.delete('/api/blogs/' + blog.id)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(204)
  })

  afterAll(async () => {
    await mongoose.connection.close()
    logger.info('disconnected from MongoDB')
  })

})