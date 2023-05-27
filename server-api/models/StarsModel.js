import { BaseModel } from "./BaseModel.js"

class StarsModelClass extends BaseModel {
  _modelNamespace = 'stars'

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

  async create({ topicId, userId, isStared }) {
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
            isStared
          },
          create: {
            topicId,
            userId,
            isStared
          }
        })
      }
    })
  }

  delete() { }
  update() { }
}

export const StarsModel = new StarsModelClass()
