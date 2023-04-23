const router = require("../express.route")
const { orderController } = require("../../modules").orderApp
const { tokenAuthentication } = require("../../middlewares/validation/auth")
const orderValidation = require("../../middlewares/validators/order/order.validator")
const checkError = require("../../middlewares/validators/validator")
const {
  tokenTicketAuthentication,
} = require("../../middlewares/validation/auth")
console.log("hello order")

router.post(
  "/reserve",
  orderController.checkOrder,
  tokenAuthentication,
  orderValidation.emptySpace,
  orderValidation.availableSeat,
  // orderValidation.orderValid,
  // checkError,
  orderController.reserveTicket
)

router.post(
  "/",
  orderController.checkOrder,
  tokenAuthentication,
  tokenTicketAuthentication,
  orderValidation.availableMoney,
  orderValidation.statusCheck,
  orderController.makeOrder
)

router.get(
  "/cancel",
  orderController.checkOrder,
  tokenAuthentication,
  orderController.cancelTicket
)

router.get(
  "/all",
  orderController.checkOrder,
  tokenAuthentication,
  orderController.getAllOrders
)

module.exports = router
