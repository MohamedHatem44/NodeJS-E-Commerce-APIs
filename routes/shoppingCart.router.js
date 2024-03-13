const express = require("express");
const {
    addToCartValidator,updateCartItemValidator,removeFromCartValidator
} = require("../validators/shoppingCart.validator");

const {
  getCart,createCart,updateShoppingCart,deleteShoppingCart,deleteShoppingCartAllToOneUser
} = require("../controllers/shoppingCart.controller");


const router = express.Router();

/*-----------------------------------------------------------------*/
// Get Cart to user
router.get("/", getCart);
/*-----------------------------------------------------------------*/
// Get Category by Id
router.post("/add",addToCartValidator,createCart);
/*-----------------------------------------------------------------*/
// Create new Category
router.patch("/update/:id", updateCartItemValidator,updateShoppingCart);
/*-----------------------------------------------------------------*/
// Update Category
router.delete("/delete/:id", removeFromCartValidator,deleteShoppingCart);
/*-----------------------------------------------------------------*/
// Delete Category by Id
router.delete("/clear", deleteShoppingCartAllToOneUser);
/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
