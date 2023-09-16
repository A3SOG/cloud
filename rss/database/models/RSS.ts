import mongoose, { Schema } from 'mongoose'

const RSSSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  url: { type: String, required: false }
})

const RSSModel = mongoose.model('rss', RSSSchema)

export default RSSModel
