/** 获取客户端真实ip地址 */
function getClientIp(ctx) {
	let ip = ctx.headers["x-forwarded-for"] ||
			ctx.ip ||
			ctx.socket.remoteAddress;

	return ip;
}


module.exports = {
	getClientIp
}
