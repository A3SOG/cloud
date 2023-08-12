import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  author: Object,
  image: String,
  summary: String,
  content: { type: String, required: true },
  tags: [String],
});

const BlogModel = mongoose.model("blog", BlogSchema);

export default BlogModel;
