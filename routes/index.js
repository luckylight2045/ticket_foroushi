const userRoute = require("./user/user.route")
const orderRoute = require("./order/order.route")
const ticketRoute = require("./ticket/ticket.route")
const authRoute = require("./auth/auth.route.js")

function router(app) {
  app.use("/user", userRoute)
  app.use("/order", orderRoute)
  app.use("/ticket", ticketRoute)
  app.use("/auth", authRoute)
}

module.exports = router
