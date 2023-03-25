const express = require("express")
const router = require("../routes")
const configs = require("../configs")

class ExpressLoader {
  constructor() {
    this.app = express()
    this.app.use(express.json())

    router(this.app)

    this.app.use((err, req, res, next) => {
      console.log(err.message)
      res.end(err.message)
    })

    this.app.use((req, res) => [
      res.status(404).json({
        error: true,
        messaeg: "this path doesn't exist!",
      }),
    ])
  }
  run() {
    this.app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${configs.PORT}`)
    })
  }
}

module.exports = ExpressLoader
