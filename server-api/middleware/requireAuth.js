import { createRequire } from "module"
const require = createRequire(import.meta.url)

import { UserService } from '../services/UserService.js'
const jwt = require('jsonwebtoken')

// Middleware to verify JWT tokens
export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(200).json({
      error: 'UNAUTHORIZED',
      status: false,
      description: 'Ошибка авторизации'
    })
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  const user = await UserService.getUser({ id: payload.userId })

  if (!user) {
    return res.status(200).json({
      error: 'UNAUTHORIZED',
      status: false,
      description: 'Ошибка авторизации'
    })
  }

  // Attach the user object to the request object for future use
  req.user = user
  next()
}

export const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    req.user = null
    next()
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  const user = await UserService.getUser({ id: payload.userId })

  if (!user) {
    return res.status(200).json({
      error: 'UNAUTHORIZED',
      status: false,
      description: 'Ошибка авторизации'
    })
  }

  delete user.password
  // Attach the user object to the request object for future use
  req.user = user
  req
  next()
}
