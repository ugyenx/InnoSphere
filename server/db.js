import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  image: String,
  title: String,
  price: Number,
  rates: Number,
  stars: Number,
  discount: Number,
  quantity: Number,
  type: String,
  details: String,
});
const User = new Schema({
  profile: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const ItemModel = mongoose.model("Items", ItemSchema);
export const UserModel = mongoose.model("Users", User);
