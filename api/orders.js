import request from '@/utils/request'
export default {

  /**
   * 生成订单
   * @param courseId
   * @returns {*}
   */
  createOrders(courseId) {
    return request({
      url: `/orderservice/course-order/createOrder/${courseId}`,
      method: 'post'
    })
  },

  /**
   * 根据id查询订单信息
   * @param id
   * @returns {*}
   */
  getOrdersInfo(id) {
    return request({
      url: `/orderservice/course-order/getOrderInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 课程支付
   * @param id
   * @returns {*}
   */
  updatePayStatus(id) {
    return request({
      url: `/orderservice/course-order/updatePayStatus/${id}`,
      method: 'get'
    })
  }
}
