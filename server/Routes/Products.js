import express from "express";
import { ItemModel } from "../db.js";
import multer from "multer";
export const productRoutes = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to 'uploads' folder
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname); // Save with original extension
  },
});
const upload = multer({ storage: storage });
productRoutes.post("/addItem", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const file = req.file;

    // Validation
    if (!name || !price || !file) {
      return res.status(400).json({ error: "Name, price, and image are required" });
    }

    // Create new product object
    const newProduct = await ItemModel.create({
      name,
      price,
      image: file.path, // Save path of uploaded image
    });

    // Save to DB
   

    res.status(201).json({ msg: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});
productRoutes.get("/allItems", async (req, res) => {
  try {
    const items = await ItemModel.find(); // Fetch everything
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
});

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
