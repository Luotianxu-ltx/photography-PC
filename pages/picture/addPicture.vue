<template>
  <div>
    <div class="articleInfo">
      <el-form :model="pictureInfo" :rules="rules">
        <el-form-item prop="title">
          <el-input type="text" placeholder="照片标题" v-model="pictureInfo.title"></el-input>
        </el-form-item>

        <!-- 照片-->
        <el-form-item label="照片">
          <el-upload
            :action="'http://127.0.0.1:8222/aliyun/fileoss/picture'"
            list-type="picture-card"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="pictureInfo.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
            </span>
            </div>
          </el-upload>
        </el-form-item>

      </el-form>
      <button @click="addNewPicture" class="newArticle">发表照片</button>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="pictureInfo.url" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import pictureApi from "../../api/picture";

export default {
  data () {
    return {
      content: '',
      user:{},
      pictureInfo:{},
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: '请输入照片标题', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.getUser()
  },
  methods: {
    getUser() {
      var userStr = cookie.get('photography_user')
      console.log(userStr)
      if (userStr === undefined || userStr === "") {
        window.open('/login')
      }else {
        this.user = JSON.parse(userStr)
      }
    },
    addNewPicture() {
      this.getUser()
      this.pictureInfo.userId = this.user.id
      console.log(this.pictureInfo)
      pictureApi.addNewPicter(this.pictureInfo)
        .then(response => {
          // console.log(response.data.data.flag)
          if (response.data.data.flag === true) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$router.push('/picture')
          }
        })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.pictureInfo.url = res.data.url
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.articleInfo.picture
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

.newArticle {
  float: right;
  height: 40px;
  width: 100px;
  margin-top: 5px;
  margin-bottom: 10px;
}
.container {
  width: 100%;
  margin: 0 auto;
  .quill-editor {
    min-height: 1100px;
    max-height: 1100px;
    overflow-y: auto;
  }
}
.articleInfo {
  width: 1100px;
  margin: 0 auto;
  padding: 10px;
}
</style>
