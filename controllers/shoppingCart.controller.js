const factory = require("../factory/factory");
const ShoppingCart = require("../models/shoppingCart.model");

const getShoppingCarts = factory.getAll(ShoppingCart);
const getShoppingCart = factory.getOne(ShoppingCart);
const createShoppingCart = factory.createOne(ShoppingCart);
const updateShoppingCart = factory.updateOne(ShoppingCart);
const deleteShoppingCart = factory.deleteOne(ShoppingCart);
const deleteAllShoppingCart = factory.deleteMany(ShoppingCart,"user");
module.exports = {
  getShoppingCarts,
  getShoppingCart,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
  deleteAllShoppingCart
};