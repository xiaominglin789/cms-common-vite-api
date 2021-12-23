const jwt = require('jsonwebtoken')

class Token {
  constructor() {}

  /** 生成token */
  genralToken(payload) {
    return jwt.sign(payload, String(process.env.SECRETKEY),
      {
        expiresIn: Number(process.env.SECRET_EXPIRESE_IN)
      }
    )
  }

  /** 校验token */
  verifyToken(token) {
    return jwt.verify(token, String(process.env.SECRETKEY))
  }
}

module.exports = new Token()