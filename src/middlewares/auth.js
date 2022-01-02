/**
 * token认证 + 路由鉴权
 */
const jwt = require('jsonwebtoken')
const { ForbiddenException, UnauthorizedException, NotFoundException, ParameterException } = require("../libs/error")
const UserDao = require("../service/user");


/** 检验是不是管理员 */
async function isAdmin(ctx) {
  const currentUser = ctx.currentUser
  
  // 根据用户id去查他的角色权限,来判断
  // TODO

  return true
}

/**
 * 1.令牌校验
 * 2.识别当前用户,绑定到ctx.currentUser上
 */
async function doJWTCheck(ctx) {
  if (!ctx.headers.authorization) {
    throw new ForbiddenException('')
  }

  const tokenStr = ctx.headers.authorization.replace('Bearer ', '')
  console.log("校验令牌: ", tokenStr)
  let jwtObj
  try {
    jwtObj = jwt.verify(tokenStr, String(process.env.SECRETKEY))
  } catch(error) {
    if (JSON.stringify(error).includes('TokenExpiredError')) {
      throw new ForbiddenException('令牌已过期')
    } else if (JSON.stringify(error).includes('JsonWebTokenError')) {
      throw new ForbiddenException('非法令牌')
    } else {
      throw new ForbiddenException()
    }
  }

  const { id } = jwtObj
  // 根据id去访问数据库查出该用户
  const user = await new UserDao().getUserById(id)
  if (!user) {
    throw new NotFoundException("用户不存在")
  }
  // 挂载
  ctx.currentUser = user
}

/**
 * refresh刷新令牌的单独拦截器处理
 */
async function refreshTokenHandle(ctx, next) {
  console.log(ctx)
  if (!ctx.headers.authorization) {
    throw new ParameterException("")
  }

  const tokenStr = ctx.headers.authorization.replace('Bearer ', '')
  let jwtObj
  try {
    jwtObj = await jwt.verify(tokenStr, String(process.env.SECRETKEY))
  } catch(error) {
    throw new ForbiddenException('', 403039)
  }

  const { id } = jwtObj
  // 根据id去访问数据库查出该用户
  const user = await new UserDao().getUserById(id)
  if (!user) {
    throw new NotFoundException("用户不存在")
  }
  // 挂载
  ctx.currentUser = user
  await next();
}

/** 是否需要登录 */
async function loginRequired(ctx, next) {
  await doJWTCheck(ctx)
  await next()
}

/** 非管理员不可访问 */
async function adminRequired() {
  await doJWTCheck(ctx)
  const is = await isAdmin()

  if (!is) {
    throw new ForbiddenException('权限不足,无法继续访问.')
  }

  await next()
}

/** 权限组鉴权 */
async function groupRequired() {}

module.exports = {
  adminRequired,
  loginRequired,
  groupRequired,
  refreshTokenHandle
}
