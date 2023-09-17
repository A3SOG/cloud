import { Schema } from 'mongoose'

const RssSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  url: { type: String, required: false }
})

export default RssSchema
