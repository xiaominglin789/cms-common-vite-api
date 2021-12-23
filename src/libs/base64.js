class Base64 {
  /** 编码 */
  encode(msg) {
    if (typeof msg !== "string") {
      return
    }
    let buff
    try {
       buff = Buffer.from(msg, 'utf8')
       buff = buff.toString('base64')
    } catch (error) {}

    return buff 
  }

  /** 解密 */
  decode(msg) {
    if (typeof msg !== "string") {
      return
    }
    let str
    try {
      str = Buffer.from(msg, 'base64')
      str = str.toString('utf8')
    } catch (error) {}
    
    return str
  }
}

module.exports = new Base64()