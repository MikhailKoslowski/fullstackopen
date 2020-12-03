const mongoose = require('mongoose')
const logger = require('../utils/logger')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('login api', () => {

  beforeEach(async () => {
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

  })

  test('login with wrong user', async () => {
    const u = {
      "username":"rot",
      "password":"T0P53CR3T"
    }

    const response = await api.post('/api/login')
      .send(u)
      .expect(401)
  })

  test('login with wrong password', async () => {
    const u = {
      "username":"root",
      "password":"T0P53CR3"
    }

    const response = await api.post('/api/login')
      .send(u)
      .expect(401)
  })

  test('login with correct user and password', async () => {
      const u = {
        "username":"root",
        "password":"T0P53CR3T"
      }
  
      const response = await api.post('/api/login')
        .send(u)
        .expect(200)
  })

  afterAll(async () => {
    await mongoose.connection.close()
    logger.info('disconnected from MongoDB')
  })
      
})
