<template>
  <div>
    <!-- 文章框架开始 -->
    <div class="article">
      <div class="w1100">
        <div class="container">
          <div class="article-header">
            <h3 class="article-title">{{article.title}}</h3>
            <div class="article-info">
              <span class="author">{{article.userName}}</span>
              <span>{{article.gmtModified}}</span>
            </div>
          </div>
          <div class="article-content">
            <p v-html="article.content">
              {{article.content}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 文章框架结束 -->
  </div>
</template>

<script>
import articleApi from "../../api/article";

export default {
  asyncData({params,error}) {
    return articleApi.getArticleInfo(params.id)
      .then(response =>{
        return {
          article:response.data.data.article
        }
      })
  }
}
</script>

<style scoped>
/* 文章框架开始 */
.article {
  margin-top: 15px;
}
.article .w1100 {
  overflow: hidden;
}
/* 文章框架结束 */

/* 内容框架开始 */

.article .container {
  padding: 30px 40px 20px;
  background: #FFF;
}
/* 内容框架结束 */

/* 文章开始 */
.article-header {
  margin-bottom: 20px;
}

.article-header h3 {
  transition: all 0.2s;
}

.article-header h3:hover {
  color: #ff7300;
}

.article-content {
  margin-bottom: 20px;
}

.article-content p {
  font-size: 14px;
  line-height: 26px;
  padding: 8px 0;
}

/* 文章结束 */

/* 侧边栏框架开始 */
.aside {
  width: 300px;
  background: #fcfcfc;
}

.aside .container {
  padding: 30px 40px 20px;
}

/* 侧边栏框架结束 */

/* 侧边栏内容开始 */

.section h4 {
  font-size: 14px;
  margin-bottom: 12px;
}



.links li {
  color: #787878;
  margin-bottom: 8px;
}

.links li a {
  color: inherit;
}

.links li a:hover {
  color: #ff7300;
}

/* 侧边栏内容结束 */
</style>
