import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../model/userModel.js'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  //comparing to database, connected to UserModel with user thru seeder

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc  Register a  new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email }) // see if user exist

  if (userExists) {
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({  //'create' syntactic sugar for .save()
    name,
    email,
    password //password encrypted by userModel middleware
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private 

const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found)')
  }
})

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private 

const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })

  } else {
    res.status(404)
    throw new Error('User not found)')
  }
})


// @desc  Get all users
// @route GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({})

  res.json(users)
})

// @desc  Remove user
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @desc  Get user by ID
// @route GET /api/users/:id
// @access Private/Admin 

const getUserById = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found)')
  }
})

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/Ad min 

const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    //'user.idAdmin' is removed, because if req.body is false, we will use what is already in the system, which might be true or false, this will prevent us from setting the 'isAdmin'. If we are trying to set it to false in the system. then system will then choose 'or' option 'user.isAdmin'

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })

  } else {
    res.status(404)
    throw new Error('User not found)')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }