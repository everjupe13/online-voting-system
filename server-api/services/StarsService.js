import { StarsModel } from "../models/StarsModel.js"
import { BaseService } from "./BaseService.js"

class StarsServiceClass extends BaseService {
  constructor(model) {
    super(model)
  }
  async rep({ topicId, userId, isStared }) {
    const rep = await this.model.create({ 
      topicId: Number(topicId),
      userId: Number(userId),
      isStared: Boolean(isStared)
    })
    return rep
  }
  async getTopicStars({ topics, topicId }) {
    return await this.model.getAll({ topicId })
  }
  updateInfo() {

  }
  deleteUser() {

  }
}

export const StarsService = new StarsServiceClass(StarsModel)
