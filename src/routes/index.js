const Router = require("koa-router")
const Token = require("../libs/token")
const router = new Router()
const CryptoHelper = require("../libs/crypto")
const Base64 = require("../libs/base64")

// 接口
router.get("/", async(ctx, next) => {
	const test = "123456"
	console.log(test, " 加密后 ", CryptoHelper.encodeAES(test))

	ctx.body = "hello"
})

router.post("/user/login", async(ctx, next) => {
	const userInfo = {
  	username: "admin",
  	password: "123456"
  }

  const { username, password } = ctx.request.body

	// console.log("username", username)
  // console.log("password", password)

  if (cryptUsernameHandle(username) === userInfo.username && 
			cryptPasswordHandle(password) === userInfo.password) {
    // 测试
		const token = await Token.genralToken({ id: 1 })

  	ctx.status = 200
		ctx.body = {
			msg: "登录成功.",
			token
		}
  } else {
  	ctx.status = 401
  	ctx.body = {
  		msg: "账号或密码错误"
  	}
  }
})


/**
 * 根据约定: 账号解密: aes-256-cbc
 */
function cryptUsernameHandle(msg) {
  if (!msg) return

  const res = CryptoHelper.decodeAES(msg)
	console.log("username-code -> res： ", res);
  return res
}

/**
 * 根据约定: 密码解密: aes-256-cbc + base64
 * 1.msg -> crypto decrypt
 * 2.res -> base64 decode -> 明文
 */
function cryptPasswordHandle(msg) {
  if (!msg) return

	console.log("原始密文: ", msg);
	// const msgLower = msg.toLowerCase(msg)
	// console.log("msgLower: ", msgLower);

	const res = CryptoHelper.decodeAES(msg)
	console.log("aes 解码: ", res);

	const msgBase64 = Base64.decode(res)
	console.log("msgBase64 解码: ", msgBase64);
	
	return msgBase64
}

module.exports = router
