import request from '@/utils/request'
export default {

  getPlayAuth(videoSourceId) {
    return request({
      url: `/vodservice/video/getPlayAuth/${videoSourceId}`,
      method: 'get'
    })
  }
}
