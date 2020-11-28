const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const { initialUsers } = require('./test_helper')

describe('user api', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    for (let user of helper.initialUsers) {
      let userObj = new User(user)
      await userObj.save()
    }
  })

  test('post works', async () => {
    const user = {
      username: "root",
      name: "Mikhail",
      password: "s3cr3t",
    }
    
    // get users length
    let response = await api.get('/api/users')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/users')
      .send(user)
      .expect(201)

    expect(response.body.username).toEqual(user.username)

    // get new len.
    response = await api.get('/api/users')
    const afterLen = response.body.length

    expect(afterLen).toEqual(beforeLen + 1)
  })

  test('username and password must be given', async () => {
    const userWithNoPassword = {
      username: "testUser",
      name: "Test",
    }
    
    const userWithNoUsername = {
      name: "Test",
      password: "s3cr3t",
    }

    // get users length
    let response = await api.get('/api/users')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/users')
      .send(userWithNoPassword)
      .expect(400)

    response = await api.post('/api/users')
      .send(userWithNoUsername)
      .expect(400)


      // get new len.
      response = await api.get('/api/users')
      const afterLen = response.body.length
  
      expect(afterLen).toEqual(beforeLen)

  })

  test('username should be more than 3 chars', async () => {
    const user = {
      username: "ab",
      name: "Test",
      password: "s3cr3t",
    }

    // get users length
    let response = await api.get('/api/users')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/users')
      .send(user)
      .expect(400)

    // get new len.
      response = await api.get('/api/users')
      const afterLen = response.body.length
  
      expect(afterLen).toEqual(beforeLen)

  })

  test('password should be more than 3 chars', async () => {
    const user = {
      username: "TestUser",
      name: "Test",
      password: "s3",
    }

    // get users length
    let response = await api.get('/api/users')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/users')
      .send(user)
      .expect(400)

    // get new len.
      response = await api.get('/api/users')
      const afterLen = response.body.length
  
      expect(afterLen).toEqual(beforeLen)

  })

  test('username must be unique', async () => {
    const user = {
      username: initialUsers[0].username,
      name: 'Mikhail',
      password: 's3cr3t',
    }
    
    // get users length
    let response = await api.get('/api/users')
    const beforeLen = response.body.length
    
    // post
    response = await api.post('/api/users')
      .send(user)
      .expect(400)

    // get new len.
    response = await api.get('/api/users')
    const afterLen = response.body.length
      
    expect(afterLen).toEqual(beforeLen)

  })

  
  afterAll(() => {
    mongoose.connection.close()
    logger.info('disconnected from MongoDB')
  })

})