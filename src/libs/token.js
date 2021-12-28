const jwt = require('jsonwebtoken')

class Token {
  constructor() {}

  /** 生成access_token */
  static genralAccessToken(payload) {
    return jwt.sign(payload, String(process.env.SECRETKEY),
      {
        expiresIn: Number(process.env.SECRET_ACCESS_TOKEN_EXPIRESE_IN)
      }
    )
  }

  /** 生成refresh_token */
  static genralRefreshToken(payload) {
    return jwt.sign(payload, String(process.env.SECRETKEY),
      {
        expiresIn: Number(process.env.SECRET_REFRESH_TOKEN_EXPIRESE_IN)
      }
    )
  }

  /** 校验token */
  static verifyToken(token) {
    return jwt.verify(token, String(process.env.SECRETKEY))
  }
}

module.exports = Token