const express = require("express");


const {
  getShoppingCarts,
    getShoppingCart,
    createShoppingCart,
    updateShoppingCart,
    deleteShoppingCart,
    deleteAllShoppingCart,
} = require("../controllers/shoppingCart.controller");

const router = express.Router();

//-----------------------------------------------------------------/
// Get All carts
router.get("/", getShoppingCarts);
//-----------------------------------------------------------------/
// Get cart by Id
router.get("/:id", getShoppingCart);
//-----------------------------------------------------------------/
// Create 
router.post("/",  createShoppingCart);
//-----------------------------------------------------------------/
// Update 
router.patch("/:id", updateShoppingCart);
//-----------------------------------------------------------------/
// Delete 
router.delete("/:id", deleteShoppingCart);
//-----------------------------------------------------------------/
// Delete aLL
router.delete("/:id/all", deleteAllShoppingCart);
//-----------------------------------------------------------------/
module.exports = router;
//-----------------------------------------------------------------