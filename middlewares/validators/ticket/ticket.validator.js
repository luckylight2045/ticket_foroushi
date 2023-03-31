const { body } = require("express-validator")
const { ticketService } = require("../../../modules").ticketApp

const ticketCheck = {
  allTickets: [
    body("location").notEmpty().isString().trim().escape(),
    body("destination").notEmpty().isString().trim().escape(),
  ],
}

module.exports = ticketCheck
