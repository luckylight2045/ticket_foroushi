const express = require("express")
const router = express.Router()
const { orderController } = require("../../modules").orderApp
const { tokenAuthentication } = require("../../middlewares/validation/auth")
const orderValidation = require("../../middlewares/validators/order/order.validator")
const checkError = require("../../middlewares/validators/validator")

router.post(
  "/",
  tokenAuthentication,
  orderValidation.emptySpace,
  orderValidation.availableMoney,
  orderValidation.availableSeat,
  orderValidation.orderValid,
  checkError,
  orderController.makeOrder
)
router.get("/all", tokenAuthentication, orderController.getAllOrders)

module.exports = router
