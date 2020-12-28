import request from '@/utils/request'
export default {

  /**
   * 课程分页列表
   * @param page
   * @param limit
   * @param searchObj
   * @returns {*}
   */
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/adminservice/courseFront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  /**
   * 查询所有分类
   * @param photographerId
   * @returns {*}
   */
  getAllSubject(photographerId) {
    return request({
      url: `/adminservice/courseservice/course-subject-one/getAllSubject`,
      method: 'get'
    })
  }
}
