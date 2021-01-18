import request from '@/utils/request'
export default {

  /**
   * 课程评论列表
   * @param current
   * @param limit
   * @param courseId
   * @returns {*}
   */
  getCommentList(current,limit,courseId) {
    return request({
      url: `/adminservice/course-comment/getList/${current}/${limit}`,
      method: 'get',
      params: {courseId}
    })
  },

  /**
   * 添加评论
   * @param comment
   * @returns {*}
   */
  addComment(comment) {
    return request({
      url: `/adminservice/course-comment/add`,
      method: 'post',
      data: comment
    })
  }
}
