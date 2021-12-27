class HttpException extends Error {
	constructor(message="服务器异常", code=100000) {
		super()
		this.code = code;
		this.message = message;
		this.status = 400;
	}
}

class ParameterException extends HttpException {
	constructor(message="请求参数错误", code=100000) {
		super()
		this.code = code;
		this.message = message;
		this.status = 400;
	}
}

class NotFoundException extends HttpException {
	constructor(message="找不到资源", code=404000) {
		super()
		this.code = code;
		this.message = message;
		this.status = 404;
	}
}

class UnauthorizedException extends HttpException {
	constructor(message="授权失败", code=401000) {
		super()
		this.code = code;
		this.message = message;
		this.status = 401;
	}
}

class ForbiddenException extends HttpException {
	constructor(message="禁止访问", code=403000) {
		super()
		this.code = code;
		this.message = message;
		this.status = 403;
	}
}

module.exports = {
	ForbiddenException,
	UnauthorizedException,
	NotFoundException,
	ParameterException,
	HttpException
}
