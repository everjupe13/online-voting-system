import { createRequire } from "module"
const require = createRequire(import.meta.url)

import { UserService } from '../services/UserService.js'
import { requireAuth } from '../middleware/requireAuth.js'

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')



router.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body

  // Check if the email is already in use
  const existingUser = await UserService.getUser({ email })
  if (existingUser) {
    return res.status(200).json({
      error: 'USER_EXIST',
      status: false,
      description: 'Пользователь уже существует'
    })
  }

  // Hash the password
  const hashedPassword = await bcryptjs.hash(password, 10)
  // Create the user
  const user = await UserService.createUser({
    email,
    password: hashedPassword
  })

  // Generate a JWT token with the user ID as the payload
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

  res.status(201).json({ token, status: true })
})

router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body

  // Check if the user is existing
  const user = await UserService.getUser({ email })

  if (!user) {
    return res.status(200).json({
      error: 'USER_UNEXIST',
      status: false,
      description: 'Неверные данные пользователя'
    })
  }

  // Compare the provided password with the hashed password stored in the database
  const match = await bcryptjs.compare(password, user.password)

  if (!match) {
    return res.status(200).json({
      error: 'AUTHENTICATION_ERROR',
      status: false,
      description: 'Неверные данные пользователя'
    })
  }

  // Generate a JWT token with the user ID as the payload
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

  const requestedUser = user
  delete requestedUser.password

  res.status(200).json({ user: requestedUser, token, status: true })
})

router.post('/user/show', requireAuth, async (req, res) => {
  const requestedUser = req.user
  delete requestedUser.password

  res.status(200).json({ user: requestedUser, status: true })
})

export { router as userRoutes }
