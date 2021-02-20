<template>
  <div>
    <div class="articleInfo">
      <el-form :model="articleInfo" :rules="rules">
        <el-form-item prop="title">
          <el-input type="text" placeholder="文章标题" v-model="articleInfo.title"></el-input>
        </el-form-item>

        <!-- 课程封面-->
        <el-form-item label="课程封面">
          <el-upload
            :action="'http://127.0.0.1:8222/aliyun/fileoss/article'"
            list-type="picture-card"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="articleInfo.picture"
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

        <el-form-item>
          <section class="container">
            <div class="quill-editor editor"
                 :content="articleInfo.content"
                 @change="onEditorChange($event)"
                 v-quill:myQuillEditor="editorOption">
            </div>
          </section>
        </el-form-item>
      </el-form>
      <button @click="addNewArticle" class="newArticle">修改文章</button>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="articleInfo.picture" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import articleApi from "../../api/article";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
];

export default {
  asyncData({params,error}) {
    return {articleId: params.editId}
  },
  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: "请输入正文",
      },
      user:{},
      articleInfo:{},
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      console.log(this.articleId)
      articleApi.getArticleInfo(this.articleId)
      .then(response => {
        this.articleInfo = response.data.data.article
        console.log(this.articleInfo)
      })
    },
    onEditorChange({ editor, html, text }) {
      this.articleInfo.content = html
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
    addNewArticle() {
      this.getUser()
      this.articleInfo.userId = this.user.id
      this.articleInfo.userName = this.user.nickname
      console.log(this.articleInfo)
      articleApi.addNewArticle(this.articleInfo)
        .then(response => {
          if (response.data.data.flag === true) {
            this.$message({
              type: 'success',
              message: "新增文章成功"
            })
            this.$router.push({path:'/article'})
          }
        })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.articleInfo.picture = res.data.url
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

.editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>

