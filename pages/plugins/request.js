/**
 * 基于axios封装的模块
 */
import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// content 是上下文对象，包含store
// 通过插件可以获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须做为 default 成员
export default ({ store }) => {
  // console.log(content)

  //请求拦截
  // 任何请求都有经过请求拦截器
  // 可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
  request.interceptors.request.use(
    function (config) {
      //   请求会经过这里
      console.log('---request发起---',config)
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }
      // 返回 config 请求配置对象
      return config
    },
    function (error) {
      // 如果请求失败（此时请求还没有发出去），就会进入这里
      return Promise.reject(error)
    },
  )
  request.interceptors.response.use(
    function(config){
      console.log('---请求结束---',config.url)
    }
  )
}

//响应拦截
