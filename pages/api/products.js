import dbConnect from "../../utils/dbConnect";
import Product from "../../models/Product";

dbConnect();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
    case "POST":
      await saveProduct(req, res);
      break;
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const saveProduct = async (req, res) => {
  const { name, price, mediaUrl, description } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const product = await new Product({
      name,
      price,
      mediaUrl,
      description,
    }).save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};
