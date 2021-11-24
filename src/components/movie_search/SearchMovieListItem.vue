<template>
  <div>
    <div class="d-flex border rounded my-2 mx-5" data-bs-toggle="modal" :data-bs-target="`#detail-${movie.id}`">
      <div>
        <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="" style="width: 200px">
        <div v-else style="width:200px; height:300px; background-color: gray;">포스터가 없습니다.</div>
      </div>
      <div class="mt-3 mx-3">
        <h3 class="mb-3">{{ movie.title }}</h3>
        <p class="card-text mb-auto">{{ movie.overview }}</p>
      </div>
    </div>
    <search-movie-list-item-modal
      :movie="movie"
      :castList="castList"
      :crewList="crewList"
    >
    </search-movie-list-item-modal>
    <hr>
  </div>
</template>

<script>
import SearchMovieListItemModal from '@/components/movie_search/SearchMovieListItemModal.vue'
import axios from 'axios'


export default {
  name: 'SearchMovieListItem',
  components: {
    SearchMovieListItemModal
  },
  props: {
    movie: {
      movie: Object
    }
  },
  data: function () {
    return {
      castList: null,
      crewList: null
    }
  },
  methods: {
    getCredit: function () {
      const params = {
        api_key: process.env.VUE_APP_API_KEY,
        language: 'ko-KR',
        region:'KR'
      }
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movie.id}/credits`,
        params,
      })
        .then(res => {
          const castList = res.data.cast.filter(cast => parseInt(cast.order) < 4).map(cast => cast.name)
          this.castList = castList.join(', ')
          const crewList = res.data.crew.filter(crew => crew.department == 'Directing').map(crew => crew.name)
          this.crewList = crewList.join(', ')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    this.getCredit()
  }
}
</script>

<style>

</style>