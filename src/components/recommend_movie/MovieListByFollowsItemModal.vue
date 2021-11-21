<template>
  <div v-if="movieData">
    <!-- <br>
    내용 :{{ movieData.overview }}
    <br>
    작성자:{{ reviewData.user.username }}
    <br>
    한줄평:{{ reviewData.quote }} -->
  </div>
</template>

<script>
export default {
  name: 'MovieListByFollowsItemModal',
  props: {
    movieData: Object,
    
    reviewData: Object,
  }
}
</script>

<style>

</style>