import request from '@/utils/request'
export default {

  /**
   * 课程评论列表
   * @param current
   * @param limit
   * @param courseId
   * @returns {*}
   */
  getArticleList(current,limit) {
    return request({
      url: `/h5service/article/getArticlePageFront/${current}/${limit}`,
      method: 'post'
    })
  },

  /**
   * 获取文章信息
   * @param id
   * @returns {*}
   */
  getArticleInfo(id) {
    return request({
      url: `/h5service/article/getArticleInfo/${id}`,
      method: 'get'
    })
  },
  /**
   * 新增文章
   * @param articleInfo
   * @returns {*}
   */
  addNewArticle(articleInfo) {
    return request({
      url: `/h5service/article/add`,
      method: 'post',
      data: articleInfo
    })
  },
  /**
   * 根据用户id查询文章
   * @param userId
   * @returns {*}
   */
  getByUserId(userId) {
    return request({
      url: `/h5service/article/getByUserId/${userId}`,
      method: 'get'
    })
  },
  /**
   * 删除
   * @param id
   * @returns {AxiosPromise}
   */
  delete(id) {
    return request({
      url: `/h5service/article/deleteArticle/${id}`,
      method: 'delete'
    })
  },
}
