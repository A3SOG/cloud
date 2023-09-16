import RSSModel from '../models/RSS'

class RSSRepository {
  async create({
    title,
    description,
    date,
    url
  }: {
    title: string
    description: string
    date: Date
    url: string
  }): Promise<any> {
    try {
      const rss = new RSSModel({
        title,
        description,
        date,
        url
      })
      return await rss.save()
    } catch (e) {
      throw e
    }
  }

  async findAll(): Promise<any> {
    try {
      return await RSSModel.find()
    } catch (e) {
      throw e
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const rss = await RSSModel.findById(id)
      if (!rss) {
        throw new Error('RSS not found')
      }
      return rss
    } catch (e) {
      throw e
    }
  }

  async update(
    _id: string,
    data: {
      title?: string
      description?: string
      date?: Date
      url?: string
    }
  ): Promise<any> {
    try {
      const rss = await RSSModel.findOneAndUpdate({ _id }, data, {
        new: true
      })
      if (!rss) {
        throw new Error('RSS not found')
      }
      return rss
    } catch (e) {
      throw e
    }
  }

  async delete(_id: string): Promise<any> {
    try {
      const rss = await RSSModel.findOneAndDelete({ _id })
      if (!rss) {
        throw new Error('RSS not found')
      }
      return { message: 'RSS deleted successfully' }
    } catch (e) {
      throw e
    }
  }
}

export default RSSRepository
