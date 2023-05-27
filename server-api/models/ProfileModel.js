import { BaseModel } from "./BaseModel.js"

class ProfileModelClass extends BaseModel {
  _profileNamespace = 'profile'

  constructor() {
    super()
  }
  async create({ userId, name, bio }) {
    return this.makeQuery({
      queryFn: async () => {
        return await this.dbProvider[this._profileNamespace].upsert({
          where: { userId },
          update: { name, bio },
          create: { name, bio, userId }
        })
      }
    })
  }
  async get(searchKeys) {
    return this.makeQuery({
      queryFn: async () => await this.dbProvider[this._profileNamespace]
        .findUnique({
          where: searchKeys
        })
    })
  }
  delete() {}
  update() {}
}

export const ProfileModel = new ProfileModelClass()
