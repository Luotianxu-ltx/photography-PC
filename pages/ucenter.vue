<template>
<div class="w1100">
  <div class="info">
    <div class="userInfoList position">
      <div class="userInfo">
        <img :src="userInfo.avatar" :alt="userInfo.nickname">
      </div>
    </div>
    <div class="userInfoList position">
      <div class="user">
        <ul>
          <li>用户昵称：{{userInfo.nickname}}</li>
          <li>电话号码：{{userInfo.mobile}}</li>
          <li>年龄：{{userInfo.age}}</li>
          <li v-if="userInfo.sex === 1">性别：女</li>
          <li v-else>性别：男</li>
        </ul>
        <el-button type="primary" icon="el-icon-edit" circle class="edit" @click="edit()"></el-button>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="title">
      <a @click="article()">文章</a>
      <span>·</span>
      <a @click="picture()">照片</a>
    </div>
  </div>
  <div class="article" v-if="flag === 0">
    <div class="btn">
      <button class="newClass" @click="addArticle">发表文章</button>
    </div>
    <el-table
    v-loading="listLoading"
    :data="articleList"
    element-loading-text="数据加载中"
    border
    fit
    highlight-current-row
    style="margin-top: 10px"
    >
      <el-table-column label="封面" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.picture" style="height: 100px; width: 100px" alt="scope.row.title">
            <img
              slot="reference"
              :src="scope.row.picture"
              :alt="scope.row.title"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="gmtCreate" label="添加时间" />
      <el-table-column prop="gmtModified" label="修改时间" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/editArticle/'+scope.row.id" style="padding-right: 5px">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeArticleById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="picture" v-if="flag === 1">
    <div class="btn">
      <button class="newClass" @click="addPicture">发布照片</button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="pictureList"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      style="margin-top: 10px"
    >
      <el-table-column label="照片" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.url" style="height: 100px; width: 100px" alt="scope.row.title">
            <img
              slot="reference"
              :src="scope.row.url"
              :alt="scope.row.title"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="gmtCreate" label="添加时间" />
      <el-table-column prop="gmtModified" label="修改时间" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/picture/'+scope.row.id" style="padding-right: 5px">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removePictureById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog title="修改用户信息" :visible.sync="dialogVisible" @close="closeDialog('userForm')">
    <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="80px" >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userInfo.nickname" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="userInfo.age" />
      </el-form-item>
      <el-form-item label="电话号码" prop="mobile">
        <el-input v-model="userInfo.mobile" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" >
        <el-radio-group v-model="userInfo.sex">
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 用户头像-->
      <el-form-item label="用户头像">
        <el-upload
          :action="'http://127.0.0.1:8222/aliyun/fileoss/user'"
          list-type="picture-card"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="userInfo.avatar"
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="update()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import cookie from "js-cookie";
import articleApi from "../api/article";
import pictureApi from "../api/picture";
import userApi from "../api/user";

export default {
  data() {
    return {
      userInfo: {},
      form: {},
      articleList: [],
      pictureList: [],
      dialogVisible: false,
      listLoading: true,
      flag: 0,
      rules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.initUserInfo()
    this.getArticleList()

  },
  methods: {
    addArticle() {
      this.$router.push({path:'/article/addArticle'})
    },
    addPicture() {
      this.$router.push({path:'/picture/addPicture'})
    },
    update() {
      userApi.edit(this.userInfo)
      .then(response => {
        if (response.data.data.flag === true) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          //清空cookie值
          cookie.set('photography_token','',{domain: 'localhost'})
          cookie.set('photography_user','',{domain: 'localhost'})
          //回到登录页面
          window.location.href = "/login";
        }
      })
    },
    edit() {
      this.dialogVisible = true
    },
    article() {
      this.flag = 0
      this.getArticleList()
    },
    picture() {
      this.flag = 1
      this.getPictureList()
    },
    initUserInfo() {
      var userStr = cookie.get('photography_user')
      // 把字符串转换json对象(js对象)
      if(userStr) {
        this.userInfo = JSON.parse(userStr)
        this.listLoading = false
        console.log(this.userInfo)
      }
    },
    getArticleList() {
      articleApi.getByUserId(this.userInfo.id)
      .then(response => {
        this.articleList = response.data.data.list
        this.listLoading = false
      })
    },
    getPictureList() {
      pictureApi.getPictureByUserId(this.userInfo.id)
      .then(response => {
        this.pictureList = response.data.data.list
      })
    },
    removeArticleById(id) {
      this.$confirm('此操作将永久删除文章，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        articleApi.delete(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            // 回到列表页面
            this.getList()
          }).catch((response) => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
      })
    },
    removePictureById(id) {
      this.$confirm('此操作将永久删除照片，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        pictureApi.deleteById(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            // 回到列表页面
            this.getList()
          }).catch((response) => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
      })
    },
    closeDialog(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar = res.data.url
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

<style scoped>
.w1100 {
  width: 1100px;
  margin: 0 auto;
}
.info {
  height: 200px;
}
.userInfoList {
  width: 366px;
  height: 100%;
  float: left;
}
.userInfo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  overflow: hidden;
}
.userInfo img {
  width: 100%;
}
.position {
  position: relative;
}
.user {
  position: absolute;
  top: 50%;
  width: 366px;
  height: 150px;
  margin: 0 auto;
  transform: translateY(-50%);
}
.user li {
  font-size: 15px;
  margin-top: 10px;
}
.edit {
  position: absolute;
  top: 0;
  right: 0;
}
.container {
  height: 50px;
  margin-top: 10px;
}
.title {
  width: 150px;
  height: 50px;
  margin: 0 auto;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
}
.title a:hover {
  color: #3BB149
}
.article {
  margin-bottom: 15px;
}
.picture {
  margin-bottom: 15px;
}
.btn {
  width: 1100px;
  margin: 0 auto;
}

.newClass {
  height: 40px;
  width: 100px;
  margin-top: 5px;
}
</style>
