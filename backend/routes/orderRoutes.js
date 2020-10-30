import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getMyOrders, getOrderItems, updateOrderToPaid } from '../controller/orderController.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderItems) //make sure that this is at the bottom, or else if you pass in /somethingElse, it will think that it is the id
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router 