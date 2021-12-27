class HttpException extends Error {
	constructor(message="服务器异常", error_code=100000) {
		super()
		this.error_code = error_code;
		this.message = message;
		this.code = 400;
	}
}

class ParameterException extends HttpException {
	constructor(message="请求参数错误", error_code=100000) {
		super()
		this.error_code = error_code;
		this.message = message;
		this.code = 400;
	}
}

class NotFoundException extends HttpException {
	constructor(message="找不到资源", error_code=404000) {
		super()
		this.error_code = error_code;
		this.message = message;
		this.code = 404;
	}
}

class UnauthorizedException extends HttpException {
	constructor(message="授权失败", error_code=401000) {
		super()
		this.error_code = error_code;
		this.message = message;
		this.code = 401;
	}
}

class ForbiddenException extends HttpException {
	constructor(message="禁止访问", error_code=403000) {
		super()
		this.error_code = error_code;
		this.message = message;
		this.code = 403;
	}
}

module.exports = {
	ForbiddenException,
	UnauthorizedException,
	NotFoundException,
	ParameterException,
	HttpException
}
