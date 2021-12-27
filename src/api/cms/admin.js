const Router = require("koa-router")
const Token = require("../../libs/token")
const CryptoHelper = require("../../libs/crypto")
const Base64 = require("../../libs/base64")
const { UnauthorizedException } = require("../../libs/error")

const router = new Router({ prefix: `${process.env.CMS_API_PREFIX}/admin` })

router.post("/login", async(ctx, next) => {
  let { username, password } = ctx.request.body

  verifyLoginInfo(username, password)
  
	const token = await Token.genralToken({ id: 1 })
	ctx.body = {
		success: true,
		error_code: 0,
		data: {
			token
		},
		message: "执行成功"
	}
})

function verifyLoginInfo(username, password) {
	// 数据库查询
	const userInfo = {
		username: "admin",
		password: "123456"
	}

	// 账号密码比对
	if (cryptUsernameHandle(username) !== userInfo.username || 
			cryptPasswordHandle(password) !== userInfo.password) {
		throw new UnauthorizedException('账号或密码错误.')
	}
}

/**
 * 根据约定: 账号解密: aes-256-cbc
 */
function cryptUsernameHandle(msg) {
  if (!msg) return

  const res = CryptoHelper.decodeAES(msg)
	console.log(msg, " 解密后 ", res)
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
	console.log(res)
	const msgBase64 = Base64.decode(res)
	console.log(msg, " 解密后 ", msgBase64)
	return msgBase64
}

module.exports = router
