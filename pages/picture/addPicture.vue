<template xmlns:id="http://www.w3.org/1999/xhtml">
  <div>
    <div class="articleInfo">
      <el-form :model="pictureInfo" :rules="rules">
        <el-form-item prop="title">
          <el-input type="text" placeholder="照片标题" v-model="pictureInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="课程分类">
          <el-select v-model="one" placeholder="一级分类" @change="subjectLevelOneChanged">
            <el-option
              v-for="subject in subjectOneList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select v-model="pictureInfo.subjectTwoId" placeholder="二级分类" style="margin-left: 5px">
            <el-option
              v-for="subject in subjectTwoList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>
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
                id="img"
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
import courseApi from "../../api/course";
import EXIF from "exif-js";

export default {
  data () {
    return {
      content: '',
      user:{},
      pictureInfo:{},
      dialogVisible: false,
      one: '',
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      rules: {
        title: [
          { required: true, message: '请输入照片标题', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.getUser()
    // 初始化一级分类
    this.getOneSubject()
  },
  methods: {
    // 点击某个一级分类，触发change，显示对应二级分类
    // value就是一份分类id
    subjectLevelOneChanged(value) {
      // 遍历所有分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i]
        // 判断： 所有一级分类id和点击一级分类id是否一样
        if (value === oneSubject.id) {
          // 从一级分类中获取所有二级分类
          this.subjectTwoList = oneSubject.children
          // 清空二级表单
          this.pictureInfo.subjectTwoId = ''
        }
      }
    },
    // 获取一级分类
    getOneSubject() {
      courseApi.getAllListTree()
        .then(response => {
          this.subjectOneList = response.data.data.list
        })
    },
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
      var img = document.getElementById("img")
      console.log(img)
      EXIF.getData(img,function () {
        var res = EXIF.getAllTags(this);
        console.log(123)
        console.log(res);
      })
      this.pictureInfo.userId = this.user.id
      // console.log(this.pictureInfo)
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

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      return isJPG
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
