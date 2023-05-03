import { BaseModel } from "./BaseModel.js"

class UserModelClass extends BaseModel {
  _userNamespace = 'user'

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
  async create({ email, password }) {
    return this.makeQuery({
      queryFn: async () => {
        return await this.dbProvider[this._userNamespace].create({
          data: {
            email,
            password
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

export const UserModel = new UserModelClass()
