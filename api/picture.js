import request from '@/utils/request'
export default {

  getPictureList(current,limit) {
    return request({
      url: `/h5service/picture/getListFront/${current}/${limit}`,
      method: 'post'
    })
  }
}
