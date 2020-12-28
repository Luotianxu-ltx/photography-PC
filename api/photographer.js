import request from '@/utils/request'
export default {

  /**
   * 摄影师分页列表
   * @param page
   * @param limit
   * @returns {*}
   */
  getPhotographerList(page,limit) {
    return request({
      url: `/adminservice/photographerFront/getPhotographerFrontList/${page}/${limit}`,
      method: 'post'
    })
  },

  /**
   * 获取摄影师信息
   * @param photographerId
   * @returns {*}
   */
  getPhotographerInfo(photographerId) {
    return request({
      url: `/adminservice/photographerFront/getPhotographerFrontInfo/${photographerId}`,
      method: 'get'
    })
  }
}
