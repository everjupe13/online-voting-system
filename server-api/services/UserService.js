import { UserModel } from "../models/UserModel.js"
import { BaseService } from "./BaseService.js"

class UserServiceClass extends BaseService {
  constructor(model) {
    super(model)
  }
  async createUser({ email, password }) {
    const user = await this.model.create({ email, password })
    return {
      ...user,
      ...(await this.getUser({ email }))
    }
  }
  async getUser({ email, id }) {
    return await this.model.get(email ? { email } : { id })
  }
  updateInfo() {

  }
  deleteUser() {

  }
}

export const UserService = new UserServiceClass(UserModel)
