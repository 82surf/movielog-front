<template>
  <div>
    <div class="modal fade" :id="`detail-${movie.id}`" tabindex="-1" aria-labelledby="movieDetail" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieDetail">영화 상세 정보</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-md-flex">
            <div class="d-flex justify-content-center">
              <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="" style="width:300px">
            </div>
            <div class="m-4">
              <h3>{{ movie.title }}</h3>
              <div>{{ movie.overview }}</div>
              <hr>
              <h5>감독</h5>
              <div>{{ crewList }}</div>
              <br>
              <h5>배우</h5>
              <div>{{ castList }}</div>
            </div>
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