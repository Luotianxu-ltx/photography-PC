import request from '@/utils/request'
export default {

  /**
   * 修改
   * @param form
   * @returns {*}
   */
  edit(form) {
    return request({
      url: `/h5service/user/update`,
      method: 'post',
      data: form
    })
  }
}
