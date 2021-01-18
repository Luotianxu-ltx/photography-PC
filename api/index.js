import request from '@/utils/request'
export default {
  /**
   * 查询前2条banner
   * @returns {*}
   */
  getBannerList() {
    return request({
      url: `/h5service/getAllBanner`,
      method: 'get'
    })
  },

  getIndexData() {
    return request({
      url: `/adminservice/indexfront/index`,
      method: 'get'
    })
  }
}
