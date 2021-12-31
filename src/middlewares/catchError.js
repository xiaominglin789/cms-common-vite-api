/**
* 错误响应拦截
* 1.拦截错误响应
* 2.统一返回格式
*/
const { HttpException } = require('../libs/error');

function catchError() {
	return async(ctx, next) => {
		try {
			await next()
			// 处理正常请求返回统一格式
			if (ctx.status.toString().charAt(0) === "2") {
				ctx.body = {
					success: true,
					code: 0,
					data: ctx.response.body || "",
					message: "ok",
					request: `${ctx.method} ${ctx.path}`
				}
			}
		} catch (error) {
			if (error instanceof HttpException) {
				ctx.body = {
					success: false,
					code: error.code,
					data: "",
					message: error.message,
					request: `${ctx.method} ${ctx.path}`
				}
				ctx.status = error.status
			} else {
				if (process.env.NODE_ENV === 'development') {
					throw error
				}
				
				ctx.body = {
					success: false,
					code: 999,
					data: "",
					message: "服务器未知异常",
					request: `${ctx.method} ${ctx.path}`
				}
				ctx.status = 500
			}
		}
	}
}

module.exports = catchError
