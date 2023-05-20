import { BaseModel } from "./BaseModel.js"

class VoteModelClass extends BaseModel {
  _modelNamespace = 'votes'

  constructor() {
    super()
  }
  async getAll(searchKeys) {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._modelNamespace]
        .findMany({
          where: searchKeys
        })
    })
  }
  async create({ topicId, userId, voteResult }) {
    console.log(voteResult)
    return this.makeQuery({
      queryFn: async () => {
        return await this.dbProvider[this._modelNamespace].upsert({
          where: {
            topicId_userId: {
              topicId,
              userId
            }
          },
          update: {
            voteResult,
            voted: true
          },
          create: {
            topicId,
            userId,
            voteResult,
            voted: true
          }
        })
      }
    })
  }
  delete() {

  }
  update() {

  }
}

export const VoteModel = new VoteModelClass()
