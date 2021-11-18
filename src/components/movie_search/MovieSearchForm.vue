<template>
  <div>
    <input v-model="keyword" @keyup.enter="inputChange" type="text">
    <button @click="inputChange">검색</button>
  </div>
</template>

<script>
export default {
  name: 'MovieSearchForm',
  data: function() {
    return {
      keyword : null,
    }
  },
  methods: {
    inputChange: function(){
      this.$emit('input-change', this.keyword)
      this.keyword = ''
    }
  }
}
</script>

<style>

</style>