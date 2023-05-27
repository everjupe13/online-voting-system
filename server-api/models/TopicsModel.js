import { BaseModel } from "./BaseModel.js"

class TopicsModelClass extends BaseModel {
  _topicsNamespace = 'topics'

  constructor() {
    super()
  }
  async get(searchKeys) {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._topicsNamespace]
        .findUnique({
          where: searchKeys
        })
    })
  }
  async getAll() {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._topicsNamespace].findMany()
    })
  }
  async create({ name, description }) {
    return this.makeQuery({
      queryFn: async () => {
        return await this.dbProvider[this._topicsNamespace].create({
          data: {
            name,
            description
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

export const TopicsModel = new TopicsModelClass()
