import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const router = express.Router()
import { requireAuth, checkAuth } from '../middleware/requireAuth.js'
import { TopicsService } from '../services/TopicsService.js'
import { VoteService } from '../services/VoteService.js'


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

router.get('/topics/search', checkAuth, async (req, res) => {
  // Get the all topics
  const topics = await TopicsService.getAllTopics()
  if (!Array.isArray(topics)) {
    return res.status(200).json({
      error: 'USER_UNEXIST',
      status: false,
      description: 'Неверные данные пользователя'
    })
  }

  const topicsVotes = await VoteService.getTopicVotes({ topics })
  const extendedTopics = topics.map((topic, topicIdx) => {
    const _votesArray = topicsVotes.find((_, idx) => idx === topicIdx)

    const votesFor = _votesArray.reduce((acc, voteData) => {
      return voteData.voteResult === true && voteData.voted ? acc += 1 : acc
    }, 0)
    const votesAgainst = _votesArray.reduce((acc, voteData) => {
      return voteData.voteResult === false && voteData.voted ? acc += 1 : acc
    }, 0)


    const _userVoteData = req.user && req.user.id
      ? _votesArray.find(vote => vote.userId === Number(req.user.id))
      : null

    const isUserVoted = _userVoteData ? _userVoteData.voted : null

    const userVoteResult = _userVoteData && isUserVoted
      ? _userVoteData.voteResult
      : null

    const votesData = {
      is_user_voted: isUserVoted,
      user_vote_result: userVoteResult,

      votes_for: votesFor,
      votes_against: votesAgainst
    }

    return {
      ...topic,
      ...votesData
    }
  })

  return res.status(200).json({ status: true, topics: extendedTopics })
})

router.get('/topics/search/:id', checkAuth, async (req, res) => {
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

  const topicVotes = await VoteService.getTopicVotes({ topicId: Number(req.params.id) })
  const _votesArray = topicVotes

  const votesFor = _votesArray.reduce((acc, voteData) => {
    return voteData.voteResult === true && voteData.voted ? acc += 1 : acc
  }, 0)
  const votesAgainst = _votesArray.reduce((acc, voteData) => {
    return voteData.voteResult === false && voteData.voted ? acc += 1 : acc
  }, 0)

  const _userVoteData = req.user && req.user.id
    ? _votesArray.find(vote => vote.userId === Number(req.user.id))
    : null

  const isUserVoted = _userVoteData ? _userVoteData.voted : null

  const userVoteResult = _userVoteData && isUserVoted
    ? _userVoteData.voteResult
    : null

  const votesData = {
    is_user_voted: isUserVoted,
    user_vote_result: userVoteResult,

    votes_for: votesFor,
    votes_against: votesAgainst
  }

  const extendedTopic = {
    ...topic,
    ...votesData
  }

  return res.status(200).json({ status: true, topic: extendedTopic })
})

export { router as topicsRoutes }
