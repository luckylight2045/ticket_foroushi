const express = require("express")
const router = express.Router()
const { ticketController } = require("../../modules").ticketApp
const ticketCheck = require("../../middlewares/validators/ticket/ticket.validator")
const checkError = require("../../middlewares/validators/validator")

router.get(
  "/",
  ticketCheck.allTickets,
  checkError,
  ticketController.getAllTickets
)

module.exports = router
