const factory = require("../factory/factory");
const Order = require("../models/order.model");
const Cart = require('../models/shoppingCart.model');
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const express = require('express');

//------------------------------------------------------------------
const getOrders = factory.getAll(Order);
const getOrder = factory.getOne(Order);
const createOrder = factory.createOne();
const updateOrder = factory.updateOne();
const deleteOrder = factory.deleteOne();

const checkoutSession = expressAsyncHandler(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    const cart = await Cart.findById(req.params.cartId);
    if(!cart){
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
                currency: 'egp',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
    });
    res.status(200).json({status: 'success', session})
});



module.exports = {
    getOrder,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    checkoutSession
};

