const tokenHelper = require('../libs/token')
const { allowMenus: userAllowMenus } = require('../config/userAllowMenus')

/** 用户业务操作 */
class UserService {
	/** 只生成accessToken */
	genralAccessToken(payload) {
		const accessToken = tokenHelper.genralAccessToken(payload)
		return { accessToken }
	}

	/** 生成双令牌 */
	generalTokens(payload) {
		const accessToken = tokenHelper.genralAccessToken(payload)
		const refreshToken = tokenHelper.genralRefreshToken(payload)
		return {
			accessToken,
			refreshToken
		}
	}

	/**
	 * 根据id去数据库查询用户
	 */
	async getUserById(id) {
		// TODO
		
		return {
			id,
			nickname: 'apem789'
		}
	}

	async getUserPermissionById(id) {
		// TODO
		// userModel,roleModel,permissionModel

		const role = ['admin']
		const menus = this.__calculateUserAllowMenu()
    const points = []
    
		const permission = [
			menus,
			points
		]

		return {
			role,
			permission
		}
	}

  /** 计算、过滤 */
	__calculateUserAllowMenu(menus) {
		return userAllowMenus
	}
}

module.exports = {
	UserService
}