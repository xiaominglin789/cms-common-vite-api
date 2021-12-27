const Koa = require("koa")
const Initzation = require("./libs/init")

const app = new Koa()

Initzation.init(app)

const port = Number(process.env.SERVER_PORT) || 7000
app.listen(port, ()=> {
	console.log("api server running at ", port)
})
