const userRoute = require("./user/user.route")
const orderRoute = require("./order/order.route")

function router(app) {
  app.use("/user", userRoute)
  app.use("/order", orderRoute)
}

module.exports = router
