const router = require("../express.route")
const { userController } = require("../../modules").userApp
const {
  createUser,
} = require("../../middlewares/validators/user/user.validator")
const checkError = require("../../middlewares/validators/validator")
const { tokenAuthentication } = require("../../middlewares/validation/auth")
const {
  loginUser,
} = require("../../middlewares/validators/user/user.validator")
const { addMoney } = require("../../middlewares/validators/user/user.validator")
const { orderController } = require("../../modules/order")

router.get("/all", tokenAuthentication, userController.getAll)
router.post("/login", loginUser, checkError, userController.login)
router.post("/add", createUser, checkError, userController.create)
router.delete("/remove", tokenAuthentication, userController.delete)
router.put("/update", tokenAuthentication, userController.update)
router.put(
  "/wallet",
  addMoney,
  checkError,
  tokenAuthentication,
  userController.addToWallet
)
router.get("/profile", tokenAuthentication, userController.get)
router.get(
  "/orders",
  orderController.checkOrder,
  tokenAuthentication,
  userController.getAllOrders
)

router.get("/refreshToken")

module.exports = router
