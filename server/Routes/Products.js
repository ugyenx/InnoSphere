import express from "express";
import { ItemModel } from "../db.js";

export const productRoutes = express.Router();

productRoutes.get("/allProduct", async function (req, res) {
  try {
    let getproducts = await ItemModel.find({});
    if (getproducts.length > 3) {
      getproducts = getproducts.slice(0, 3);
    }
    let newproducts = [];

    for (const product of getproducts) {
      let newproduct = {
        image: product.image,
        title: product.title,
        price: product.price,
        rates: product.rates,
        stars: product.stars,
        discount: product.discount,
        quantity: product.quantity,
        type: product.type,
        details: product.details,
      };
      console.log(newproduct);
    }
    console.log(newproducts);
    res.status(200).json({
      msg: "All products",
      products: newproducts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
});
productRoutes.get("/products/:id", async function (req, res) {
  try {
    const name = req.query.name;

    let getproducts = undefined;
    if (name == "") {
      getproducts = await ItemModel.find({});
    } else {
      getproducts = await ItemModel.find({
        title: { $regex: name, $options: "i" },
      });
    }
    let newproducts = [];

    for (const product of getproducts) {
      let newproduct = {
        image: product.image,
        title: product.title,
        price: product.price,
        rates: product.rates,
        stars: product.stars,
        discount: product.discount,
        quantity: product.quantity,
        type: product.type,
        details: product.details,
      };
    }
    res.status(200).json({
      msg: "All products",
      products: newproducts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
});
