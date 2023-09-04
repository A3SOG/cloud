import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  uid: String,
  name: String
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
