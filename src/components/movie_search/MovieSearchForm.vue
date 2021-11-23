<template>
<<<<<<< HEAD
  <div>
    <h1 class="text-center">무슨 영화를 보셨나요?</h1>
=======
  <div class="d-flex flex-column align-items-center">
    <h2 class="my-5">어떤 영화를 보셨나요?</h2>
>>>>>>> 2589c5cbe7a2e2bdc59e34a0c5af009633ee9e91
    <div class="input-group mb-3">
      <input type="text" v-model="keyword" class="form-control" aria-describedby="inputGroup-sizing-default" @keyup.enter="inputChange" placeholder="영화 제목을 입력해주세요.">
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