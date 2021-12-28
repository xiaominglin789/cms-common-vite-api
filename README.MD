# cms-common-vite-api 接口服务
[通用后台前端项目](https://github.com/xiaominglin789/cms-common-vite)
- 需求:给cms-common-vite开发配套的接口服务
- 未来计划: 使用SpringBoot来重新开发,当前项目只做简单的接口处理
```bash
# 目录
--src
  --api          接口目录
    --cms           后台接口
    --v1            web服务接口-v1
    --v2            web服务接口-v1
  --config       配置文件夹
  --libs         通用依赖方法
  --middlewares  中间件
  --model        数据模型
  --service      数据模型操作
  --validator    校验器
  index.js       程序入口
.env.production  env配置信息
package.json     npm依赖配置
```




## bug-1
> api 端 node 原生 crypto 模块做加解密 和 前端 crypto-js 加解密的字符串位数匹配不上,调了半天没弄好。
> ps: 对 node 相关基础仍不大熟悉,得花时间好好看看 node 文档才行
- bug 已解决
  是没有看明白 crypto 如何使用的锅, 还有前端字符加密时,给参照`网上案例`同时给了转大写的操作。
  这样,导致后端 crypto 的解密需要条件:
  - 需要确定 aes 加密的类型
  - 前后端的 key,iv 也要保持一致
```bash
1.crypto-js库根据key的长度,自行切换aes加密的类型。如:
- key如果设置成 32 位, 每一位8个字节,32*8 = 256 => aes-256-cbc
- key如果设置成 16 位, 每-位8个字节, 16*8 = 128 => aes-128-xxx
- key如果设置成 8 位, 每-位8个字节,  8*8 = 64 => aes-64-xxx

ps:
- cbc 是根据 crypto-js 加密是传入的`mode`参数决定,默认值也是`cbc`
- aes：如果 key 不是 8/16/32 位,则会使用 aes-256.
- 为何key的每位占8个字节?key字符串用数字、字母或特殊字符。这样,每个字符只需要一位（这里理解可能有误）
```
> CryptHelper
```javascript
  ...
  encodeAES(msg, type="aes-256-cbc") {
    if (!msg) return

    const cipherived = crypto.createCipheriv(
      type,
      String(process.env.AESKEY32),
      String(process.env.AESIV16)
    )

    return  cipherived.update(msg, 'utf8', 'hex') + cipherived.final('hex')
  }

  /**
   * aes解码
   * @param {*} msg
   * @returns
   */
  decodeAES(msg, type="aes-256-cbc") {
    if(!msg) return

    const cipher = crypto.createDecipheriv(
      type,
      String(process.env.AESKEY32),
      String(process.env.AESIV16))
    return  cipher.update(msg, 'hex', 'utf8') + cipher.final('utf8')
  }
```




### 统一返回json的格式<正常响应 | 异常>
```bash
{
  success: boolean,
  code: number
  data: <key,value> | "",
  message: string,
  request: string
}
```
- 在 `catchError` 中间件上处理即可
```javascript
/**
* 错误响应拦截
* 1.拦截错误响应
* 2.统一返回格式
*/
const { HttpException } = require('../libs/error');

function catchError() {
  return async(ctx, next) => {
      try {
        await next()
        // 处理正常请求返回统一格式
        if (ctx.status.toString().charAt(0) === "2") {
          ctx.body = {
            success: true,
            code: 0,
            data: ctx.response.body || "",
            message: "ok",
            request: `${ctx.method} $${ctx.path}`
          }
        }
      } catch (error) {
        // 处理异常的格式统一
        if (error instanceof HttpException) {
          ctx.body = {
            success: false,
            code: error.code,
            data: "",
            message: error.message,
            request: `${ctx.method} $${ctx.path}`
          }
          ctx.status = error.status
        } else {
          ctx.body = {
            success: false,
            code: 999,
            data: "",
            message: "服务器未知异常",
            request: `${ctx.method} ${ctx.path}`
          }
          ctx.status = 500
      }
    }
  }
}

module.exports = catchError

```