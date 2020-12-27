import request from '@/utils/request'
export default {
  /**
   * 查询前2条banner
   * @returns {*}
   */
  registerUser(formItem) {
    return request({
      url: `/h5service/user/register`,
      method: 'post',
      data: formItem
    })
  }
}
