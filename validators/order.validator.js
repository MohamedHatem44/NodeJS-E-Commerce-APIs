const {check}=require("express-validator");
const validatorMiddleware=require("../middlewares/validatorMiddleware");
//----------------------------------------
const getOrderValidator = [
    check("id").isMongoId().withMessage("Invalid order id format"),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const createOrderValidator =[
 check('user')
.notEmpty()
.withMessage('User ID is required')
.isMongoId()
.withMessage('Invalid User ID format'),
check('products')
.isArray({ min: 1 })
.withMessage('At least one product must be included in the order'),
check('products.*.product')
.notEmpty()
.withMessage('Product ID is required')
.isMongoId()
.withMessage('Invalid Product ID format'),
check('products.*.quantity')
.notEmpty()
.withMessage('Quantity is required')
.isInt({ min: 1 })
.withMessage('Quantity must be at least 1'),
check('totalPrice')
.notEmpty()
.withMessage('Total price is required')
.isNumeric()
.withMessage('Total price must be a number'),
check('status')
.optional()
.isIn(['placed', 'shipped', 'delivered', 'cancelled'])
.withMessage('Invalid status'),
validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const updateOrderValidator = [
    check("id").isMongoId().withMessage("Invalid Order id format"),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const deleteOrderValidator = [
    check("id").isMongoId().withMessage("Invalid Order id format"),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
module.exports = {
    getOrderValidator,
    createOrderValidator,
    updateOrderValidator,
    deleteOrderValidator,
};
/*-----------------------------------------------------------------*/
