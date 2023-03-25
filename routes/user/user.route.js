const express = require("express")
const router = express.Router()
const { userController } = require("../../modules").userApp
const { createUser } = require("../../middlewares/validators/user.validator")
const checkError = require("../../middlewares/validators/validator")
const { tokenAuthentication } = require("../../middlewares/validation/auth")
const { loginUser } = require("../../middlewares/validators/user.validator")

router.get("/all", tokenAuthentication, userController.getAll)
router.post("/login", loginUser, checkError, userController.login)
router.post("/add", createUser, checkError, userController.create)
router.delete("/:id/remove", userController.delete)
router.put("/:id/update", userController.update)

module.exports = router
