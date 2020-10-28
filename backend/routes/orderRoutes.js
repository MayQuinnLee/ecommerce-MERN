import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getOrderItems } from '../controller/orderController.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderItems) //make sure that this is at the bottom, or else if you pass in /somethingElse, it will think that it is the id

export default router 