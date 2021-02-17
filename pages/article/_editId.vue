<template>
  <div>
    {{ articleId }}
  </div>
</template>

<script>
export default {
  asyncData({params,error}) {
    return {articleId: params.editId}
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
