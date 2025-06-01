import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  image: String,
  name: String,
  price: Number,
});
const OrderSchema = new Schema({
  order_id: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
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
export const OrderModel = mongoose.model("Orders", OrderSchema);
