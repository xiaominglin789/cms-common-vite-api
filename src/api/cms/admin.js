const Router = require("koa-router")
const { AdminService } = require("../../service/adminService")
const { adminRequired } = require('../../middlewares/auth')

const router = new Router({ prefix: `${process.env.CMS_API_PREFIX}/admin` })

/** 查询所有可分配的权限 */ 
router.get("/permission", async(ctx, next) => {

})

/**
 * 查询所有用户
 * @param page 页数
 * @param size 每页条数
 */
router.get("/users", adminRequired, async(ctx, next) => {
  console.log(ctx.request.query);
  
  const { page, size } = ctx.request.query
  if (!page) { page = 1 }
  if (!size) { size = 1 }
  const result = new AdminService().getUserListByPage(Number(page), Number(size))

  ctx.body = result
})

/** 修改用户密码 */ 
router.put("/user/:id/password", async(ctx, next) => {

})

/** 删除用户 */ 
router.post("/user/:id", async(ctx, next) => {

})

/** 管理员更新用户信息 */ 
router.put("/user/:id", async(ctx, next) => {

})

/** 查询所有权限组及其权限 */ 
router.get("/group", async(ctx, next) => {

})

/** 查询所有权限组 */ 
router.get("/group/all", async(ctx, next) => {

})

/** 查询一个权限组及其权限 */ 
router.get("/group/:id", async(ctx, next) => {

})

/** 新建权限组 */ 
router.post("/group", async(ctx, next) => {

})

/** 删除一个权限组 */ 
router.post("/group/:id", async(ctx, next) => {

})

/** 分配单个权限 */ 
router.put("/permission/dispatch", async(ctx, next) => {

})

/** 分配多个权限 */ 
router.put("/permission/dispatch/batch", async(ctx, next) => {

})

/** 删除多个权限 */ 
router.post("/permission/remove", async(ctx, next) => {

})

module.exports = router
