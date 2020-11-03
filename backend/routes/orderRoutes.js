import express from 'express'
const router = express.Router()
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import { addOrderItems, getMyOrders, getOrderItems, updateOrderToPaid, getOrders, deleteOrder, updateOrderToDelivered } from '../controller/orderController.js'

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderItems).delete(protect, isAdmin, deleteOrder)
//make sure that this is at the bottom, or else if you pass in /somethingElse, it will think that it is the id
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router 