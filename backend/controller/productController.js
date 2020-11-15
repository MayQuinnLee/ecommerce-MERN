import asyncHandler from 'express-async-handler' //middleware to handle error with Error-Handler
import Product from '../model/productModel.js'

// @desc  Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc  Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Nameeee',
    price: 0,
    slotsAvailable: 0,
    image: 'Sample image',
    user: req.user._id,
    instructor: 'Sample instructor',
    category: 'Sample category',
    description: 'Sample description'
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(500)
    throw new Error('Product not created')
  }
})


// @desc  Update a single product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.instructor = req.body.instructor || product.instructor
    product.image = req.body.image || product.image
    product.slotsAvailable = req.body.slotsAvailable || product.slotsAvailable

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc  Create a new review for a product
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('User already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.user._id
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview }