import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const router = express.Router()

import { VoteService } from '../services/VoteService.js'
import { requireAuth } from '../middleware/requireAuth.js'


router.post('/vote/topic/:id', requireAuth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({
      error: 'INVALID_PARAMETERS',
      status: false,
      description: 'Неверные данные'
    })
  }

  const user = req.user
  const voted = await VoteService.vote({
    topicId: req.params.id,
    userId: user.id,
    voteResult: req.body.voteResult
  })

  if (voted) {
    return res.status(200).json({ status: true, voted: true })
  }

  return res.status(200).json({
    error: 'INVALID_PARAMETERS',
    status: false,
    description: 'Неверные данные'
  })

})

export { router as votesRoutes }
