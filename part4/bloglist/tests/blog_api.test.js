const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { initialBlogs } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('blog api get all', async () => {
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

afterAll(() => {
  mongoose.connection.close()
  logger.info('disconnected from MongoDB')
})