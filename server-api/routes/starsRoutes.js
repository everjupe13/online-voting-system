import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const router = express.Router()

import { StarsService } from '../services/StarsService.js'
import { requireAuth, checkAuth } from '../middleware/requireAuth.js'


router.post('/stars/topic/:id', requireAuth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({
      error: 'INVALID_PARAMETERS',
      status: false,
      description: 'Неверные данные'
    })
  }
  const user = req.user

  const stars = await StarsService.getTopicStars({ topicId: Number(req.params.id) })
  const userResult = stars.find(star => star.userId === user.id)

  const stared = await StarsService.rep({
    topicId: req.params.id,
    userId: user.id,
    isStared: !userResult?.isStared
  })

  if (stared) {
    return res.status(200).json({ status: true, stared })
  }

  return res.status(200).json({
    error: 'INVALID_PARAMETERS',
    status: false,
    description: 'Неверные данные'
  })

})

router.post('/stars/topic/search/:id', checkAuth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({
      error: 'INVALID_PARAMETERS',
      status: false,
      description: 'Неверные данные'
    })
  }

  const stars = await StarsService.getTopicStars({ topicId: Number(req.params.id) })
  const starsCount = stars.reduce((acc, starObject) => {
    return starObject.isStared === true ? acc += 1 : acc
  }, 0)

  return res.status(200).json({ status: true, stars: starsCount })
})
export { router as starsRoutes }
