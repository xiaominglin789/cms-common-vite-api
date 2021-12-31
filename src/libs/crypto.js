const crypto = require("crypto")

class CryptoHelper {

  constructor() {}

  /**
   * aes加密
   * @param {*} key
   * @param {*} type 加解码的类型,默认 aes-256-cbc
   */
   encodeAES(msg, type="aes-256-cbc") {
    if (!msg) return

    try {
      const cipherived = crypto.createCipheriv(
        type,
        String(process.env.AESKEY32),
        String(process.env.AESIV16)
      )

      return cipherived.update(msg, 'utf8', 'hex') + cipherived.final('hex')
    } catch(error) {
      throw error
    }
  }

  /**
   * aes解码
   * @param {*} msg
   * @param {*} type 加解码的类型,默认 aes-256-cbc
   * @returns
   */
  decodeAES(msg, type="aes-256-cbc") {
    if(!msg) return

    try {
      const cipher = crypto.createDecipheriv(
        type, 
        String(process.env.AESKEY32), 
        String(process.env.AESIV16)
      )
      return cipher.update(msg, 'hex', 'utf8') + cipher.final('utf8')
    } catch(error) {
      throw error
    }
  }
}

module.exports = new CryptoHelper()
