const tokenHelper = require('../libs/token')

/** 用户业务操作 */
class UserDao {
	/** 生成双令牌 */
	generalTokens(payload) {
		const access_token = tokenHelper.genralAccessToken(payload)
		const refresh_token = tokenHelper.genralRefreshToken(payload)
		return {
			access_token,
			refresh_token
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
}

module.exports = UserDao
