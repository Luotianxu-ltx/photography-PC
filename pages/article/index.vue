<template>
  <div>
    <div class="btn" v-if="isAdd === true">
      <button class="newClass" @click="add">发表文章</button>
    </div>
    <!-- 文章列表开始 -->
    <ul class="articlelList w1100">
      <li class="fl" v-for="article in data.items" :key="article.id">
        <a :href="'/article/'+article.id" class="thumbnail">
          <img :src="article.picture" :alt="article.title">
        </a>
        <div class="content">
          <a class="article-title" :href="'/article/'+article.id">{{article.title}}</a>
          <div class="article-info">
            <span class="author">{{article.userName}}</span>
            <span>{{article.gmtModified}}</span>
          </div>
          <div class="brief">
            {{article.content}}
          </div>
        </div>
      </li>
    </ul>
    <!-- 文章列表结束 -->
    <!-- 公共分页 开始 -->
    <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a>
        <div class="clear"/>
      </div>
    </div>
    <!-- 公共分页 结束 -->
  </div>
</template>

<script>
import articleApi from "../../api/article";
import cookie from "js-cookie";

export default {
  data() {
    return {
      data: {},
      user: {},
      isAdd: true
    }
  },
  created() {
    this.gotoPage(1)
    this.getUser()
  },
  methods: {
    getList(page) {
      articleApi.getArticleList(1,8)
      .then(response => {
        this.data = response.data.data()
      })
    },
    getUser() {
      var userStr = cookie.get('photography_user')
      if (userStr === undefined || userStr === "") {
        this.isAdd = false
      } else{
        this.user = JSON.parse(userStr)
      }
    },
    gotoPage(page) {
      articleApi.getArticleList(page,4)
      .then(response => {
        this.data = response.data.data
      })
    },
    add() {
      this.$router.push({path:'/article/addArticle'})
    }
  }
}
</script>

<style scoped>
a:hover {
  color: #ff7300;
}

input, textarea {
  border: 1px solid #ccc;
  outline: none;
  color: #555;
  font-family: inherit;
}

input {
  padding: 0;
}

textarea {
  padding: 10px;
}

.fl {
  float: left;
  margin-right: 20px;
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

.w1100 {
  width: 1100px;
  height: 935px;
  margin: 0 auto;
}

/* 文章信息开始 */
.article-info {
  margin-top:5px;
  overflow: hidden;
}

.article-info span {
  float: left;
  padding-right: 6px;
  margin-right: 6px;
  position: relative;
}

.article-info span:not(:last-child):after {
  content: '';
  width: 1px;
  height: 10px;
  position: absolute;
  right: 0;
  top: 3px;
  background: #3f434c;
}

.article-info .author {
  color: #ff7300;
}

/* 文章信息结束 */

/* 文章标题开始 */
.article-title {
  display: block;
  font-size: 20px;
  font-weight: bold;
}
/* 文章标题结束 */

/* 文章列表开始 */
.articlelList {
  overflow: hidden;
}

.articlelList li {
  width: 530px;
  height: 430px;
  background: #FFF;
  margin-top: 30px;
  box-shadow: 2px 2px 3px #e1e1e1;
}

.articlelList .thumbnail img {
  display: block;
  width: 530px;
  height: 240px;
}

.articlelList .content {
  padding: 16px 20px 0;
}

.articlelList .brief {
  font-size: 14px;
  line-height: 24px;
  margin-top: 20px;
}
/* 文章列表结束 */
</style>
