const factory = require("../factory/factory");
const Order = require("../models/order.model");
const Cart = require("../models/shoppingCart.model");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const AsyncHandler = require("express-async-handler");
require("dotenv").config();
const express = require("express");
/*-----------------------------------------------------------------*/
// @desc    Get list of orders
// @route   GET /api/v1/orders
// @access  Public
const getOrders = factory.getAll(Order);
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders for the user" });
  }
};
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

// const createOrder=AsyncHandler(async(req,res,next)=>{
//   const cartId=req.params.cartID;
//   if(!cartId)
//       return next("cartId required");
//   //get cart by id
//   const cart= await Cart.findById(req.params.cartID).populate('user').exec();;
//   if(!cart)
//       return next(new customError("can't found this cart",204));
//   const taxPrice=0;
//   const shippingPrice=0;
//   const totalOrderPrice=cart.totalprice + taxPrice+shippingPrice;
//   //create order
//   console.log("inside createorder user :",cart.user.address)
  
//   const order=await Order.create({
//       user:cart.user,
//       cartItems:cart.cartItems,
//       totalOrderPrice,
//       shippingAddress:cart.user.address //// set shipping address in user
//   })

//   //increment Sold and decrement quantity in Product
//   const Bulkoption=cart.cartItems.map((item)=>({
//       updateOne:{
//           filter:{_id:item.product},update:{$inc:{quantity: -item.quantity,sold: +item.quantity}}
//       }
//   }));
//   Product.bulkWrite(Bulkoption,{})

//   //clear cart 
//   await Cart.findByIdAndDelete(req.params.cartID)

//   const payment=await Payment.create({
//       orderId:order.id,
//       status:'success',
//       totalPrice:order.totalOrderPrice
//   })
 
//   res.redirect(`http://localhost:4200/paymentSuccess/${payment._id}`);
//   // res.status(201).json({success:'success',data:order})
// })

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

const checkoutSession = AsyncHandler(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartID)
    .populate('cartItems.product')
    .exec();
  if (!cart) {
    next(new CustomError('not found this cart', 404));
  }
  console.log("before create session cart :", cart);
  const items = cart.cartItems.map((item) => {
    return {
      price_data: {
        currency: 'egp',
        product_data: {
          name: item.product.title,
          images: [`${req.protocol}://${req.get('host')}/api/v1/images/${item.product.image}`],
          description: item.product.description
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/api/v1/payment/success/${req.params.cartID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartID,
  });
  res.json({ status: "success", session });
});

const filterObject = (req, res, next) => {
  let filter = {};
  if (req.user.role === 'user') {
    console.log(req.user._id);
    filter = { user: req.user._id };
    console.log("filter var", filter);
  }
  req.filterObj = filter;
  next();
};

/*-----------------------------------------------------------------*/
module.exports = {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  checkoutSession,
  getOrdersByUser
};
/*-----------------------------------------------------------------*/
