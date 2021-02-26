import request from '@/utils/request'
export default {

  /**
   * 查询照片
   * @param current
   * @param limit
   * @returns {*}
   */
  getPictureList(current,limit,searchObj) {
    return request({
      url: `/h5service/picture/getListPicture/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  /**
   * 根据用户id查询照片
   * @param userId
   * @returns {*}
   */
  getPictureByUserId(userId) {
    return request({
      url: `/h5service/picture/getPictureByUserId/${userId}`,
      method: 'get'
    })
  },
  /**
   * 根据id删除
   * @param id
   * @returns {AxiosPromise}
   */
  deleteById(id) {
    return request({
      url: `/h5service/picture/delete/${id}`,
      method: 'delete'
    })
  },
  /**
   * 新增照片
   * @param pictureInfo
   * @returns {*}
   */
  addNewPicter(pictureInfo) {
    return request({
      url: `/h5service/picture/addPicture`,
      method: 'post',
      data: pictureInfo
    })
  }
}
