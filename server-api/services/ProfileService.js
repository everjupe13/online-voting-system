import { BaseService } from "./BaseService.js"
import { ProfileModel } from "../models/ProfileModel.js"

class ProfileServiceClass extends BaseService {
  constructor(model) {
    super(model)
  }
  async updateInfo({ userId, name, bio }) {
    const profile = await this.model.create({  userId: Number(userId), name, bio })
    delete profile.id
    return profile
  }
  async getUserInfo({ userId }) {
    return await this.model.get({ userId: Number(userId) })
  }

}

export const ProfileService = new ProfileServiceClass(ProfileModel)
