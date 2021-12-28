/**
 * token认证 + 路由鉴权
 */

/** 检验是不是管理员 */
function isAdmin() {}

/** 非管理员不可访问 */
function adminRequired() {}

/** 是否需要登录 */
function loginRequired() {}

/** 权限组鉴权 */
function groupRequired() {}

module.exports = {
  adminRequired,
  loginRequired,
  groupRequired
}
