const userRoute = require("./user/user.route")

function router(app) {
  app.use("/user", userRoute)
}

module.exports = router
