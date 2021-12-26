const bodyParser = require("koa-bodyparser")
const router = require("../routes/index")
const dotEnv = require('dotenv')
const catchError = require("../middlewares/catch-error")

class Initzation {

  constructor(app) {
    this.initConfig()
    this.initPlugins(app)
    this.initRoutes(app)
    this.initData()
  }

  initPlugins(app) {
    app.use(catchError)
    // 中间件注册
    app.use(bodyParser())
    app.use(router.routes(), router.allowedMethods())
  }

  initRoutes(app) {}

  initData() {}

  initConfig() {
    // 初始化dotenv配置
    const devPath = ".env"
	  const prodPath = ".env.production"
	  const curPath = ""

    if (process.env.NODE_ENV === 'development') {
			this.curPath = this.devPath
		} else if (process.env.NODE_ENV === 'production') {
			this.curPath = this.prodPath
		}
    dotEnv.config(this.curPath)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
}

module.exports = Initzation