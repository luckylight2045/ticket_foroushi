const express = require("express")
const router = express.Router()
const { ticketController } = require("../../modules").ticketApp
const ticketCheck = require("../../middlewares/validators/ticket/ticket.validator")
const checkError = require("../../middlewares/validators/validator")
const { orderController } = require("../../modules").orderApp

router.get(
  "/",
  orderController.checkOrder,
  ticketCheck.allTickets,
  checkError,
  ticketController.getAllTickets
)

module.exports = router
