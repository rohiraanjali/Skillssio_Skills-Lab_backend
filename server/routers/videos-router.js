const express = require("express");
const router = express.Router();
const { Product } = require("../models/ProductModel");

router.route("/")
.get(async (req, res) => {
  try {
    const products = await Product.find({});
  res.json({ success: true, products })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
  }
  
})
.post(async (req, res) => {
  try {
    const product = req.body;
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();
    res.json({ success: true, product: savedProduct })
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message})
  }
})

router.route("/:id")
.get((req, res) => {
  const { id } = req.params
  console.log("paramsChecked", req.paramsChecked)
  const product = products.find(product => product.id === parseInt(id, 10))

  if (product) {
    return res.json({ product, success: true, welcome: req.user.name })
  } res.status(404).json({ success: false, message: "The product ID sent has no product associated with it. Check and try again"})
})
.post((req, res) => {
  const { id } = req.params
  console.log(typeof id)
  const updateProduct = req.body

  // Temp code, will be replaced by DB
  products.forEach(product => {
    if (product.id === parseInt(id, 10)) { // match
      Object.keys(updateProduct).forEach(key => {
      if (key in product) {
        product[key] = updateProduct[key]
      }
     })
    }
  })

  res.json({ products, success: true })
})
.delete((req, res) =>  res.json({ success: false, message: "delete not implemented"}))


module.exports = router