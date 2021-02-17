<template>
  <div>
    {{ pictureId }}
  </div>
</template>

<script>
export default {
  asyncData({params,error}) {
    return {pictureId: params.editId}
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {}

}
</script>

<style scoped>

</style>
