const { userList } = require("../config/userList")

/** 管理员操作j接口 */
class AdminService {
	constructor(){}

	/** 获取员工列表 */
	getUserListByPage(page, size=1) {
		return this.__filterUserList(page, size)
	}

	__filterUserList(page, size=1) {
		const len = userList.length
		const canPage = Math.ceil(len / size)

		let result;
		if (page > canPage) {
			result = []
		} else {
			result = userList.slice((page-1) * size, size)
		}

		return {
			page,
			size,
			total: len,
			list: result
		}
	}
}

module.exports = {
	AdminService
}
