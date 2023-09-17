import mongoose from 'mongoose'
import RssSchema from './rssSchema'

const RSSModel = mongoose.model('rss', RssSchema)

export default RSSModel
