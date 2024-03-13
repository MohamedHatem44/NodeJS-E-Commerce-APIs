const express = require("express");
const {
getOrderValidator,
createOrderValidator,
updateOrderValidator,
deleteOrderValidator,
} = require("../validators/order.validator");

const authService = require('../controllers/Auth.controller');

const {
getOrder,
createOrder,
updateOrder,
deleteOrder,
getOrders,
checkoutSession
} = require("../controllers/order.controller");

const router = express.Router();
/*-----------------------------------------------------------------*/

router.get('/checkout-session/:cartId', authService.allowedTo('user'), checkoutSession);

// Get All Orders

router.get("/",authService.allowedTo('admin'), getOrders);
/*-----------------------------------------------------------------*/
// Get Order by Id
router.get("/:id", getOrderValidator, getOrder);
/*-----------------------------------------------------------------*/
// Create new Order
router.post("/", createOrderValidator, createOrder);
/*-----------------------------------------------------------------*/
// Update Order
router.patch("/:id", updateOrderValidator, updateOrder);
/*-----------------------------------------------------------------*/
// Delete Order by Id
router.delete("/:id", deleteOrderValidator, deleteOrder);
/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
