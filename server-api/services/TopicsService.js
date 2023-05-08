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
    return await this.model.get({ id: Number(id) })
  }
  async getAllTopics() {
    return await this.model.getAll()
  }
  updateInfo() {

  }
  deleteUser() {

  }
}

export const TopicsService = new TopicsServiceClass(TopicsModel)
