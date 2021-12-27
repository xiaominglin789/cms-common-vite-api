const Router = require("koa-router")
const { ForbiddenException } = require("../../libs/error")

const router = new Router()

router.get("/", async (ctx,next) => {
	ctx.body = "hello"
})

module.exports = router
