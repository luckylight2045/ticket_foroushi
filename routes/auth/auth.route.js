const router = require("../express.route")
const tokenRefresh = require("../refreshToken/auth.refreshToken")

router.get("/refreshToken", tokenRefresh.refreshOne)

module.exports = router
