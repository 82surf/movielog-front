<template>
  <div>
    <div class="modal fade" :id="`detail-${movie.id}`" tabindex="-1" aria-labelledby="movieDetail" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieDetail">영화 상세 정보</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="" style="width:200px">
            <p>영화 제목: {{ movie.title }}</p>
            <p>영화 줄거리: {{ movie.overview }}</p>
            <p>감독: {{ crewList }}</p>
            <p>배우: {{ castList }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="selectMovie" data-bs-dismiss="modal">리뷰 작성하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchMovieListItemModal',
  props: {
    movie: Object,
    castList: String,
    crewList: String,
  },
  methods: {
    selectMovie : function(){
      this.$store.dispatch('selectMovie', this.movie)
      this.$router.push({ name:'ReviewCreate' })
    },
  }
}
</script>

<style>

</style>