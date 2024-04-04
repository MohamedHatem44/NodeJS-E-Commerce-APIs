const express=require("express");
// const { checkoutSessionService } = require("../services/orderService");
// const { auth } = require("../middleware/auth");
const { createOrder,checkoutSession } = require("../controllers/order.controller");
const router=express.Router();


router.get("/checkout/:cartID",checkoutSession)
router.get("/result",)
router.get("/success/:cartID",createOrder)    //go to ceate order and create payment documnet
module.exports=router;