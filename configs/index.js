require("dotenv").config()

const configs = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRE_TIME: process.env.EXPIRE_TIME,
}

module.exports = configs
