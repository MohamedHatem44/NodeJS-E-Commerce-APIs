const express = require("express");

const AuthService = require("../controllers/Auth.controller");


const {
getOrders,
} = require("../controllers/order.controller");

const {
    getProducts,
} = require("../controllers/product.controller");

const {
    getCategories,
    } = require("../controllers/category.controller");

 const {
     getUsers,
     } = require("../controllers/User.controller");

const router = express.Router();
/*-----------------------------------------------------------------*/

// Get All Orders
router.get("/orders",AuthService.protect,
AuthService.allowedTo("admin"), getOrders);
// Get All products
router.get("/products",AuthService.protect,
AuthService.allowedTo("admin"), getProducts);
// Get All categories
router.get("/categories",AuthService.protect,
AuthService.allowedTo("admin"), getCategories);
// Get All Users
router.get("/users",AuthService.protect,
AuthService.allowedTo("admin"), getUsers);
/*-----------------------------------------------------------------*/
module.exports = router;
