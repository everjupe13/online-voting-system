import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const router = express.Router()

import { ProfileService } from '../services/ProfileService.js'
import { requireAuth } from '../middleware/requireAuth.js'


router.post('/profile/index/', requireAuth, async (req, res) => {
  const user = req.user
  const profile = await ProfileService.updateInfo({
    userId: user.id,
    name: req.body.name,
    bio: req.body.bio
  })

  if (profile) {
    return res.status(200).json({ status: true, profile })
  }

  return res.status(200).json({
    error: 'INVALID_PARAMETERS',
    status: false,
    description: 'Неверные данные'
  })
})

router.post('/profile/show/', requireAuth, async (req, res) => {
  const profile = await ProfileService.getUserInfo({ userId: req.user.id })

  if (profile) {
    return res.status(200).json({ status: true, profile })
  }

  return res.status(200).json({
    error: 'INVALID_PARAMETERS',
    status: false,
    description: 'Неверные данные'
  })
})

export { router as profileRoutes }
