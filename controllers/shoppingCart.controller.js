const factory = require("../factory/factory");
const ShoppingCart = require("../models/shoppingCart.model");

const getCart = factory.getOneByQuery(ShoppingCart,user);
/*-----------------------------------------------------------------*/

const createCart = factory.createOne(ShoppingCart);
/*-----------------------------------------------------------------*/

const updateShoppingCart = factory.updateOneByQuery(ShoppingCart,product);
/*-----------------------------------------------------------------*/

const deleteShoppingCart = factory.deleteOneByQuery(ShoppingCart,product);

/*-----------------------------------------------------------------*/

const deleteShoppingCartAllToOneUser = factory.deleteMany(ShoppingCart,user);

module.exports = {
    getCart,
    createCart,
    updateShoppingCart,
    deleteShoppingCart,
    deleteShoppingCartAllToOneUser,
  };