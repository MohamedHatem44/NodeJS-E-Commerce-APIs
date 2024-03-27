const factory = require("../factory/factory");
const Order = require("../models/order.model");
const Cart = require("../models/shoppingCart.model");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const express = require("express");
/*-----------------------------------------------------------------*/
// @desc    Get list of orders
// @route   GET /api/v1/orders
// @access  Public
const getOrders = factory.getAll(Order);
/*-----------------------------------------------------------------*/
// @desc    Get specific order by id
// @route   GET /api/v1/orders/:id
// @access  Public
const getOrder = factory.getOne(Order);
/*-----------------------------------------------------------------*/
// @desc    Create order
// @route   POST  /api/v1/orders
// @access  Private
const createOrder = factory.createOne(Order);
/*-----------------------------------------------------------------*/
// @desc    Update specific order
// @route   PUT /api/v1/orders/:id
// @access  Private
const updateOrder = factory.updateOne(Order);
/*-----------------------------------------------------------------*/
// @desc    Delete specific order
// @route   DELETE /api/v1/orders/:id
// @access  Private
const deleteOrder = factory.deleteOne(Order);
/*-----------------------------------------------------------------*/
const checkoutSession = expressAsyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  //Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        name: req.user.name,
        amount: totalOrderPrice * 100,
        currency: "egp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });
  res.status(200).json({ status: "success", session });
});
/*-----------------------------------------------------------------*/
module.exports = {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  checkoutSession,
};
/*-----------------------------------------------------------------*/
