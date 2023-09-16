import axios from 'axios'
import RSSRepository from '../database/repository/RSSRepository'

class RSSService {
  private rssRepository: RSSRepository

  constructor() {
    this.rssRepository = new RSSRepository()
  }

  async createRSS(data: any): Promise<any> {
    return await this.rssRepository.create(data)
  }

  async getAllRSS(): Promise<any[]> {
    return await this.rssRepository.findAll()
  }

  async getRSSById(id: string): Promise<any | null> {
    return await this.rssRepository.findById(id)
  }

  async updateRSS(id: string, data: any): Promise<any> {
    return await this.rssRepository.update(id, data)
  }

  async deleteRSS(id: string): Promise<any> {
    return await this.rssRepository.delete(id)
  }
}

export default RSSService
