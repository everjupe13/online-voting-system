import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const router = express.Router()
import { requireAuth } from '../middleware/requireAuth.js'
import { TopicsService } from '../services/TopicsService.js'


router.post('/topics/create', requireAuth, async (req, res) => {
  // Get the all topics
  const { name, description } = req.body

  const createdTopic = await TopicsService.createTopic({ name, description })
  if (!createdTopic) {
    return res.status(200).json({
      status: false,
      error: 'UNEXPECTED_ERROR',
      description: 'Произошла ошибка'
    })
  }

  return res.status(200).json({ status: true, topic: createdTopic })
})

router.get('/topics/search', async (req, res) => {
  // Get the all topics
  const topics = await TopicsService.getAllTopics()
  if (!Array.isArray(topics)) {
    return res.status(200).json({
      error: 'USER_UNEXIST',
      status: false,
      description: 'Неверные данные пользователя'
    })
  }

  return res.status(200).json({ status: true, topics })
})

router.get('/topics/search/:id', async (req, res) => {
  // Get topic by
  if (!req.params.id) {
    return res.status(200).json({
      error: 'INVALID_PARAMETERS',
      status: false,
      description: 'Неверные данные'
    })
  }

  const topic = await TopicsService.getTopic({ id: req.params.id })
  if (!topic && Object.keys(topic || {})?.length) {
    return res.status(200).json({
      status: false,
      error: 'UNEXPECTED_ERROR',
      description: 'Произошла ошибка'
    })
  }

  return res.status(200).json({ status: true, topic })
})

export { router as topicsRoutes }
