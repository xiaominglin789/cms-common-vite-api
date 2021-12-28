const Router = require("koa-router")
const { ParameterException } = require("../../libs/error")

const router = new Router({ 
	prefix: `${process.env.WEB_API_PREFIX}/v1/user`
})

// test /web/user/login
router.get("/login", async(ctx, next) => {
	const id = ctx.query.id
	if (!id) {
		throw new ParameterException('参数不齐')
	}
	ctx.body = {
		id
	}
})

module.exports = router
