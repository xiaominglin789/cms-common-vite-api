const crypto = require("crypto")

class CryptoHelper {

  constructor() {}

  getCipher() {
    return crypto.getCiphers()
  }

  /**
   * aes加密
   * @param {*} key
   */
  encodeAES(msg) {
    if (!msg) return
    
    let crypted = ""

    return  crypted
  }
  
  /**
   * aes解码
   * @param {*} msg 
   * @returns 
   */
  decodeAES(msg) {
    if(!msg) return

    const cipher = crypto.createDecipheriv('aes-256-cbc',String(process.env.AESKEY32), String(process.env.AESIV16))
    return  cipher.update(msg, 'base64', 'utf8') + cipher.final('utf8')
  }

}

module.exports = new CryptoHelper()
