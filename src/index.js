const Koa = require("koa")
const Initzation = require("./libs/init")

const app = new Koa()

new Initzation(app)

app.listen(7000, ()=> {
	console.log("api server running at ", 7000)
})
