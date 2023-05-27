import { VoteModel } from "../models/VoteModel.js"
import { BaseService } from "./BaseService.js"

class VoteServiceClass extends BaseService {
  constructor(model) {
    super(model)
  }
  async vote({ topicId, userId, voteResult }) {
    const vote = await this.model.create({ 
      topicId: Number(topicId),
      userId: Number(userId),
      voteResult: Boolean(voteResult)
    })
    return vote
  }
  async getTopicVotes({ topics, topicId }) {
    if (topics && Array.isArray(topics) && topics.length) {
      return await Promise.all(topics.map(topic => this.model.getAll({ topicId: topic.id })))
    }
    return await this.model.getAll({ topicId })
  }
  updateInfo() {

  }
  deleteUser() {

  }
}

export const VoteService = new VoteServiceClass(VoteModel)
