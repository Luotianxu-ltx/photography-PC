import request from '@/utils/request'
export default {

  /**
   * 用户登录
   * @param formItem
   * @returns {*}
   */
  login(userInfo) {
    return request({
      url: `/h5service/user/login`,
      method: 'post',
      data: userInfo
    })
  },

  /**
   * 根据token获取用户信息
   * @returns {*}
   */
  getUserInfo() {
    return request({
      url: `/h5service/user/getUserInfo`,
      method: 'get'
    })
  }
}
