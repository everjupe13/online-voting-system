import { BaseService } from './BaseService.js'
import { TopicsModel } from '../models/TopicsModel.js'

class TopicsServiceClass extends BaseService {
  constructor(model) {
    super(model)
  }
  async createTopic({ name, description }) {
    const topic = await this.model.create({ name, description })
    
    return {
      ...topic
    }
  }
  async getTopic({ id }) {
    const topic = await this.model.get({ id: Number(id) })
    return topic
  }
  async getAllTopics() {
    const topics = await this.model.getAll()
    topics.map(topic => {
      return { ...topic, voteFor: 1, voteAgainst: 0 }
    })
    return topics
  }
  updateInfo() {

  }
  deleteUser() {

  }
}

export const TopicsService = new TopicsServiceClass(TopicsModel)
