const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const requireDirectory = require("require-directory")
const dotEnv = require('dotenv')
const catchError = require("../middlewares/catchError")

class Initzation {

  static init(app) {
    Initzation.initConfig()
    Initzation.initPlugins(app)
    Initzation.initRoutes(app)
    Initzation.initData()
  }

  static initPlugins(app) {
    // 中间件注册
    app.use(bodyParser())
    app.use(catchError())
  }

  static initRoutes(app) {
    const targetPath = `${process.cwd()}${process.env.ROUTE_PATH}`
    try {
      console.log("path: ", targetPath);
      requireDirectory(module, targetPath, {
        visit: (obj) => {
          if (obj instanceof Router) {
            app.use(obj.routes())
          }
        }
      })
    } catch (error) {
      console.error("加载路径文件失败: path", targetPath);
    }
  }

  static initData() {}

  static initConfig() {
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