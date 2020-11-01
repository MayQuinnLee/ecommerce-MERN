import asyncHandler from 'express-async-handler' //middleware to handle error with Error-Handler
import Product from '../model/productModel.js'

// @desc  Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
})

// @desc  Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
    //this will work with the Error-Handler because of express-async-handler
  }
})

// @desc  Delete single product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
    //this will work with the Error-Handler because of express-async-handler
  }
})

export { getProducts, getProductById, deleteProduct }