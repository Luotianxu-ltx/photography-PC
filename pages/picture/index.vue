<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 照片列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部照片</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">照片类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex === index}">
                  <a :title="item.title" href="#">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <ul class="clearfix">
            <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex === index}">
              <a :title="item.title" href="#">{{item.title}}</a>
            </li>
          </ul>
          <div class="clear"></div>
        </section>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <section class="big-container w1100">
            <div class="img-container flex">
              <div v-for="(item,index) in data" :key="index" class="column">
                <div v-for="(each,i) in item" :key="i" class="img-card" style="width: 220px">
                  <img :src="each.url" :alt="each.title">
                  <p>作者：{{each.nickname}}</p>
                  <p>标题：{{each.title}}</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </section>
    </section>
    <!-- 照片列表 结束 -->
    <div class="w1100">
      <button class="morePicture">加载更多</button>
    </div>
  </div>
</template>
<script>
import pictureApi from "../../api/picture";
import courseApi from "../../api/course";
export default {
  components:{},
  props: {},
  data() {
    return {
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      data: {}
    }
  },
  watch: {},
  created() {
    this.getList()
    this.initSubject()
  },
  mounted() {
  },
  methods: {
    // 查询所有分类
    initSubject() {
      courseApi.getAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.list
        })
    },
    getList() {
      pictureApi.getPictureList(1,20)
        .then(response => {
          this.data = response.data.data.list
          // this.sliceData()
          this.sliceData2()
        })
    },
    sliceData() {
      const width = window.innerWidth
      console.log("width: " + width)
      const column = Math.floor(width / 220)
      console.log("column: " + column)
      const num = Math.floor(this.data.length / column)
      console.log("num: " + num)
      let arr = this.data.map((item,index) => {
        if (index < num - 2) {
          return this.data.slice(index * num,(index + 1) * num)
        }
        if (index < num - 1) {
          return this.data.slice(index * num)
        }

      })
      arr = arr.filter(item => item)
      this.data = arr
      console.log(this.data)
    },
    sliceData2() {
      const column = Math.floor(1100 / 200)
      console.log("column: " + column)
      const num = Math.floor(this.data.length / column)
      console.log("num: " + num)
      let arr = this.data.map((item,index) => {
        if (index <= column - 2) {
          return this.data.slice(index * num,(index + 1) * num)
        }
        if (index === column - 1) {
          return this.data.slice(index * num)
        }

      })
      arr = arr.filter(item => item)
      this.data = arr
      console.log(this.data)
    }
  }
}
</script>
<style lang="stylus" scoped>
.w1100 {
  width 1100px
  margin 0 auto
}
.big-container
  //width calc(100vw - (100vw - 100%))
  min-height 100vh
.flex
  display flex
.f-aj-c
  display flex
  align-items center
  align-content center
  justify-content center
.f-c-b
  display flex
  align-items center
  justify-content space-between
.f-c-a
  display flex
  align-items center
  justify-content space-around
.f-aj-c
  display flex
  align-items center
.t-c
  text-align center
.big-container
  .img-container
    .column
      flex 1
      min-width 200px
      .img-card
        //box-shadow 0 0 10px 0 rgba(0,0,0,.2)
        &+.img-card
          //margin-top 15px
        img
          width 100%
.img-card
  img:hover
    width 110%
.morePicture
  height: 50px
  width: 100px
  margin 0 auto
</style>
