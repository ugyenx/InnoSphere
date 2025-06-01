import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

export const razorpay_secret = process.env.RAZORPAY_KEY_SECRET;
export const Id = process.env.RAZORPAY_KEY_ID;

export const razorpay = () => {
  return new Razorpay({
    key_id: Id,
    key_secret: razorpay_secret,
  });
};
