/**
* 错误响应拦截
* 1.拦截错误响应
* 2.统一返回格式
*/
const { HttpException } = require('../libs/error');

const catchError = async (ctx, next) => {
  	try {
  		await next()
  	} catch (error) {
  		if (error instanceof HttpException) {
  			ctx.body = {
  				success: false,
  				error_code: error.error_code,
  				data: null,
  				message: error.message,
					request: `${ctx.method} $${ctx.path}`
  			}
  			ctx.status = error.code
  		} else {
  			ctx.body = {
  				success: false,
					error_code: 999,
					data: null,
					message: '服务器未知异常',
					request: `${ctx.method} $${ctx.path}`
  			}
  			ctx.status = 500
  	}
  }
}

module.exports = catchError
