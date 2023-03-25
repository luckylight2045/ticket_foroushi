const db = require("./db.js")
const ExpressLoader = require("./loaders/expressLoader")

async function connectionCheck() {
  await db.$connect()
}

connectionCheck()
  .then(() => {
    console.log("connected to db...")
    const app = new ExpressLoader()
    app.run()
  })
  .catch((err) => {
    console.log(err.message)
    db.$disconnect()
    process.exit(1)
  })
