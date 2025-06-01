import { Router } from "express";
import { ItemModel, OrderModel } from "../db.js";
import { razorpay } from "../config.js";
import { razorpay_secret } from "../config.js";
import crypto from "crypto";
import { userAuth } from "../auth.js";
export const paymentRoutes = Router();
const razorPayInstance = razorpay();

paymentRoutes.post("/createOrder", userAuth, async function (req, res) {
  try {
    const { orderItems } = req.body;
    let total = 0;
    for (const element of orderItems) {
      let item = await ItemModel.findOne({ _id: element._id });
      total += item.price * element.quantity;
    }
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: "receipt_order_1",
    };
    razorPayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "something went wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "something went wrong",
    });
  }
});

paymentRoutes.post("/verifyPayment", userAuth,async function (req, res) {
  const { order_id, payment_id, signature, orderItems } = req.body;
  const hmac = crypto.createHmac("sha256", razorpay_secret);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    const items = [];
    for (const item of orderItems) {
      items.push(item._id);
    }
    let newOrder = await OrderModel.create({
      order_id: order_id,
      items: items,
      user: req.user,
    });
    return res.status(200).json({
      success: "Items purchased successfully",
      message: "Payment verified",
    });
  } else {
    return res.status(400).json({
      failure: "couldnt purchase the Items",
      message: "payment not verified",
    });
  }
});
