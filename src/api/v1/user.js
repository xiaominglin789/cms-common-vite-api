const Router = require("koa-router")

const router = new Router({ prefix: `${process.env.WEB_API_PREFIX}/user` })

router.post("/login", async(ctx, next) => {
	ctx.body = "test"
})

module.exports = router
