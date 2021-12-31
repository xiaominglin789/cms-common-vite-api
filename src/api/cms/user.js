const Router = require("koa-router")
const CryptoHelper = require("../../libs/crypto")
const Base64 = require("../../libs/base64")
const { UnauthorizedException } = require("../../libs/error")
const UserDao = require("../../service/user")
const { loginRequired, refreshTokenHandle } = require("../../middlewares/auth")
const jwt = require('jsonwebtoken')

const router = new Router({ prefix: `${process.env.CMS_API_PREFIX}/user` })

/** 管理员新建新用户 */
router.post("/register", async(ctx, next) => {

})

/** 登录 */
router.post("/login", async(ctx, next) => {
  let { username, password } = ctx.request.body

  const result = verifyLoginInfo(username, password)
  
	const tokens = new UserDao().generalTokens(result)
	ctx.body = tokens
})

/** 更新自己的信息 */
router.put("/", async(ctx, next) => {

})

/** 修改密码 */
router.put("/change_password", async(ctx, next) => {

})

/** 刷新令牌- refresh_token -> access_token */
router.get("/refresh", refreshTokenHandle, async(ctx, next) => {
	const currentUser = ctx.currentUser
	console.log(currentUser, ' 申请新令牌')
	const accessToken = jwt.sign({ id: currentUser.id }, String(process.env.SECRETKEY),
      {
        expiresIn: 1
      }
    )
	console.log("生成新令牌: ", accessToken)
	ctx.body = accessToken
})

/** 查询自己的权限 */
router.get("/permission", async(ctx, next) => {

})

/** 查询自己信息 */
router.get("/information", loginRequired, async(ctx, next) => {
	const result = {
		nickname: "apem123",
	  role: ['admin'],
	  permission: {
	    menus: ['userManage', 'roleList', 'permissionList', 'articleRanking', 'articleCreate'],
	    points: ['distributeRole', 'importUser', 'removeUser', 'distributePermission']
	  },
	  avatar: 'https://picsum.photos/32/32?random=1'
	}

	ctx.body = result
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

	// userInfo { id: xxx, nickname: xxx }
	return { id: 1 }
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