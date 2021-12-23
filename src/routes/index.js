const Router = require("koa-router")
const Token = require("../libs/token")
const router = new Router()
const CryptoHelper = require("../libs/crypto")

// 接口
router.get("/", async(ctx, next) => {
  ctx.body = "hello"
})

router.post("/user/login", async(ctx, next) => {
	const userInfo = {
  	username: "admin",
  	password: "123456"
  }
  console.log(ctx.request.body.username)
  const body = ctx.request.body

	console.log("返回: ", ctx.request.body.username)
	console.log(CryptoHelper.decodeAES(ctx.request.body.username))

  if (body.username === userInfo.username && body.password === userInfo.password) {
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

module.exports = router
