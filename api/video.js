import request from '@/utils/request'
export default {

  getPlayAuth(videoSourceId) {
    return request({
      url: `/aliyun/video/getPlayAuth/${videoSourceId}`,
      method: 'get'
    })
  }
}
