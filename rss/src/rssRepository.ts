import RssModel from './rssModel'

class RssRepository {
  async findAll(): Promise<any> {
    try {
      return await RssModel.find()
    } catch (e) {
      throw e
    }
  }

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
      const rss = new RssModel({
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

  async findById(id: string): Promise<any> {
    try {
      const rss = await RssModel.findById(id)
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
      const rss = await RssModel.findOneAndUpdate({ _id }, data, {
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
      const rss = await RssModel.findOneAndDelete({ _id })
      if (!rss) {
        throw new Error('RSS not found')
      }
      return { message: 'RSS deleted successfully' }
    } catch (e) {
      throw e
    }
  }
}

export default RssRepository
