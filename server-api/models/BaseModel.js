import { PrismaClient } from '@prisma/client'

export class BaseModel {
  constructor() {
    this.dbService = PrismaClient
    this.dbProvider = null
  }
  async connectDb() {
    if (this.dbProvider === null) {
      return this.dbProvider = new this.dbService()
    }
  }

  async disconnectDb() {
    await this.dbProvider.$disconnect()
    this.dbProvider = null
  }

  async makeQuery({ queryFn }) {
    this.connectDb()

    try {
      const result = await queryFn()

      await this.disconnectDb()
      return result
    } catch (e) {
      console.error(e)
      await this.disconnectDb()
      throw e
    }
  }
}
