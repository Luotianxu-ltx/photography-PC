import axios from "axios";
import { MessageBox, Message } from 'element-ui'
import cookie from "js-cookie"
// 创建axios实例
const service = axios.create({
  baseURL:'http://127.0.0.1:8222',
  timeout:20000
})

// 拦截器
service.interceptors.request.use(
  config => {
    // 判断cookie里是否有数据
    if (cookie.get('photography_token')) {
      // 把获取的token值放到header里面
      config.headers['token'] = cookie.get('photography_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })
export default service
