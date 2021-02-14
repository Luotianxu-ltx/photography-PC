<!--<template>-->
<!--  <div id="contioner" class="w1100">-->
<!--    <section>-->
<!--      <vue-masonry-wall :items="items" :options="options" @append="append">-->
<!--        <template v-slot:default="{item}">-->
<!--          <div class="Item">-->
<!--            <img :src="item.image"/>-->
<!--            <div class="Content">-->
<!--              <h5 class="text-ellipsis-1l">{{item.title}}</h5>-->
<!--              <p class="text-ellipsis-2l">{{item.content}}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </vue-masonry-wall>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import VueMasonryWall from "vue-masonry-wall"-->
<!--export default {-->
<!--  name: "ExampleMasonry",-->
<!--  components: {VueMasonryWall},-->
<!--  data() {-->
<!--    return {-->
<!--      options: {-->
<!--        width: 200,-->
<!--        padding: {-->
<!--          2: 8,-->
<!--          default: 1-->
<!--        },-->
<!--        columnWidth: 200,-->
<!--      },-->
<!--      items: [-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--        {-->
<!--          title: '标题',-->
<!--          content: '说明.',-->
<!--          image: 'https://edu-luotianxu.oss-cn-beijing.aliyuncs.com/article/2021/02/10/ba8a1760e9d74117a6ccd41f95cf48c01.jpg'-->
<!--        },-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    append() {-->
<!--      // 追加方法-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--.w1100 {-->
<!--  width: 1100px;-->
<!--  margin: 0 auto;-->
<!--}-->
<!--</style>-->
<template>
  <section class="big-container">
    <h2>瀑布流</h2>
    <div class="img-container flex">
      <div v-for="(item,index) in data" :key="index" class="column">
        <div v-for="(each,i) in item" :key="i" class="img-card">
          <img :src="each.url" :alt="each.title">
          <p>作者：{{each.nickname}}</p>
          <p>标题：{{each.title}}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import pictureApi from "../../api/picture";
export default {
  components:{},
  props: {},
  data() {
    return {
      data: {}
    }
  },
  watch: {},
  methods: {
    getList() {
      pictureApi.getPictureList(1,20)
        .then(response => {
          this.data = response.data.data.list

          this.sliceData()

        })
    },
    sliceData() {
      const width = window.innerWidth
      console.log("width: " + width)
      const column = Math.floor(width / 335)
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
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>

.big-container
  width calc(100vw - (100vw - 100%))
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
  h2
    padding 10px 0
    text-align center
  .img-container
    .column
      flex 1
      min-width 235px
      &+.column
        margin-right 10px
      .img-card
        box-shadow 0 0 10px 0 rgba(0,0,0,.2)
        &+.img-card
          margin-top 15px
        img
          width 100%
</style>
