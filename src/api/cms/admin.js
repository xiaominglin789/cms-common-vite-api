const Router = require("koa-router")
const Token = require("../../libs/token")
const CryptoHelper = require("../../libs/crypto")
const Base64 = require("../../libs/base64")
const { UnauthorizedException } = require("../../libs/error")

const router = new Router({ prefix: `${process.env.CMS_API_PREFIX}/admin` })

router.post("/login", async(ctx, next) => {
	const userInfo = {
  	username: "admin",
  	password: "123456"
  }

  let { username, password } = ctx.request.body

  console.log("username: ", username)
  console.log("password: ", password)
  
  // console.log(username, " 解密后 ", CryptoHelper.decodeAES(username))
	// console.log(password, " 解密后 ", CryptoHelper.decodeAES(password.toLowerCase()))
	// if (CryptoHelper.decodeAES(username) === userInfo.username && 
	// 		CryptoHelper.decodeAES(password.toLowerCase()) === userInfo.password) {
  if (cryptUsernameHandle(username) === userInfo.username && 
			cryptPasswordHandle(password) === userInfo.password) {
    // 测试
		const token = await Token.genralToken({ id: 1 })

  	ctx.status = 200
		ctx.body = {
			success: true,
			error_code: 0,
			data: {
				token
			},
			message: "执行成功"
		}
  } else {
  	const err = new UnauthorizedException("账号或密码错误")
  	throw err
  }
})


/**
 * 根据约定: 账号解密: aes-256-cbc
 */
function cryptUsernameHandle(msg) {
  if (!msg) return

  const res = CryptoHelper.decodeAES(msg)
  return res
}

/**
 * 根据约定: 密码解密: aes-256-cbc + base64
 * 1.msg -> crypto decrypt
 * 2.res -> base64 decode -> 明文
 */
function cryptPasswordHandle(msg) {
  if (!msg) return
	const res = CryptoHelper.decodeAES(msg)
	const msgBase64 = Base64.decode(res)
	return msgBase64
}

module.exports = router
