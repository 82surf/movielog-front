<template>
  <div>
    <h1 class="text-center">무슨 영화를 보셨나요?</h1>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">영화제목</span>
      <input type="text" v-model="keyword" class="form-control" aria-describedby="inputGroup-sizing-default" @keyup.enter="inputChange">
      <button @click="inputChange" class="btn btn-outline-primary">검색</button>
    </div>
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