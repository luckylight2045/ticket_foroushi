const express = require("express")
const router = express.Router()
const { orderController } = require("../../modules").orderApp
const { tokenAuthentication } = require("../../middlewares/validation/auth")
const orderValidation = require("../../middlewares/validators/order/order.validator")
const checkError = require("../../middlewares/validators/validator")
const {
  tokenTicketAuthentication,
} = require("../../middlewares/validation/auth")

router.post(
  "/reserve",
  tokenAuthentication,
  orderValidation.emptySpace,
  orderValidation.availableSeat,
  orderValidation.orderValid,
  checkError,
  orderController.reserveTicket
)
router.post(
  "/",
  tokenAuthentication,
  tokenTicketAuthentication,
  orderValidation.availableMoney,
  orderValidation.statusCheck,
  orderController.makeOrder
)
router.get("/all", tokenAuthentication, orderController.getAllOrders)

module.exports = router
