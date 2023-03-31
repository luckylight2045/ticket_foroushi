const userRoute = require("./user/user.route")
const orderRoute = require("./order/order.route")
const ticketRoute = require("./ticket/ticket.route")

function router(app) {
  app.use("/user", userRoute)
  app.use("/order", orderRoute)
  app.use("/ticket", ticketRoute)
}

module.exports = router
