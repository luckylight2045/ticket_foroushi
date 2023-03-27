const jwt = require("jsonwebtoken")
const configs = require("../../configs")
const { userService } = require("../../modules").userApp

exports.tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.json({
      error: true,
      message: "token is needed",
    })
  }

  console.log(process.env.EXPIRE_TIME)
  const token = authorization.includes("Bearer")
    ? authorization.split(" ")[1]
    : authorization

  try {
    const verifiedToken = jwt.verify(token, configs.SECRET_KEY)
    const { email } = verifiedToken
    const user = await userService.getUserByEmail(email)
    req.user = user
    next()
  } catch (err) {
    console.log(err.message)
    next(err)
  }
}
