<template>
  <div class="d-flex">
      <div style="float:none" data-bs-toggle="modal" :data-bs-target="`#detail-${movie.id}`">
        <div v-if="movie.poster_path" style="float:left">
          <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="" style="width:200px">
        </div>
        <div v-else style="width:200px; height:300px; float:left">
          이미지가 없습니다.
        </div>
        <span>{{ movie.title }}</span>
        <p>{{ movie.overview }}</p>
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

const API_KEY = '70b5f8cc0018e10bfcf6146a7aaf3dec'

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
        api_key: API_KEY,
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