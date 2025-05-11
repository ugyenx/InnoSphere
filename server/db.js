import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  image: String,
  name: String,
  price: Number,
 
});
const User = new Schema({

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
