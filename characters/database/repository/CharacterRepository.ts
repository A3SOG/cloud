import redisClient from '../ArmaRedis'
import ArmoryModel from '../models/ArmoryModel'
import CharacterModel from '../models/CharacterModel'
import GarageModel from '../models/GarageModel'

interface CharacterData {
  [key: string]: any[]
}

interface RawData {
  [key: string]: [string, any]
}

class CharacterRepository {
  convertDataFormat(data: RawData): CharacterData {
    let result: CharacterData = {}

    Object.values(data).forEach(([key, value]: [string, any[]]) => {
      result[key] = value
    })

    return result
  }

  async findCharacterByKey(key: string): Promise<any> {
    const data = await redisClient.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as RawData
    const rawData = this.convertDataFormat(parsedData)
    return new CharacterModel(rawData)
  }

  async findArmoryByKey(key: string): Promise<any> {
    const data = await redisClient.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data)
    return new ArmoryModel(parsedData)
  }

  async findGarageByKey(key: string): Promise<any> {
    const data = await redisClient.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data)
    return new GarageModel(parsedData)
  }

  async findMessagesByKey(key: string) {
    const listData = await redisClient.lrange(key, 0, -1)
    return listData
  }
}

export default CharacterRepository
