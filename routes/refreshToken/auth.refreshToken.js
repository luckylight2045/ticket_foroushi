const { userService } = require("../../modules").userApp
const { userController } = require("../../modules").userApp
const jwt = require("jsonwebtoken")
const configs = require("../../configs")

const tokenRefresh = {
  refreshOne: async (req, res) => {
    try {
      const { email } = req.body
      const user = await userService.getUserByEmail(email)

      const date = new Date()
      const refreshToken = await userService.getRefreshTokenById(user.id)

      if (date >= refreshToken.expireTime) {
        userController.logout(req, res)
        return res.end("refresh token is expired! please login again")
      } else {
        const newAccessToken = jwt.sign({ id: user.id }, configs.SECRET_KEY, {
          expiresIn: configs.EXPIRE_TIME,
        })

        res.json({
          access_token: newAccessToken,
          refresh_token: refreshToken,
        })
      }
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = tokenRefresh
