import { BaseModel } from "./BaseModel.js"

class TopicsModelClass extends BaseModel {
  _userNamespace = 'topics'

  constructor() {
    super()
  }
  async get(searchKeys) {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._userNamespace]
        .findUnique({
          where: searchKeys
        })
    })
  }
  async getAll() {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._userNamespace].findMany()
    })
  }
  async create({ name, description }) {
    return this.makeQuery({
      queryFn: async () => {
        return await this.dbProvider[this._userNamespace].create({
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
