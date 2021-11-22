<template>
  <div>
    <img :src="`https://image.tmdb.org/t/p/original/${movie.thumbnail_path}`" alt="" style="width:200px">
    <movie-list-by-follows-item-modal 
      :movie-data="movieData"
      :review-data="movie"
    ></movie-list-by-follows-item-modal>
  </div>
</template>

<script>
import axios from 'axios'
import MovieListByFollowsItemModal from '@/components/recommend_movie/MovieListByFollowsItemModal.vue'

export default {
  name: 'MovieListByFollowsItem',
  components : {
    MovieListByFollowsItemModal,
  },
  data : function () {
    return {
      movieData: null,
    }
  },
  props: {
    movie: Object,
  },
  methods: {
    atCreated: function() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movie.tmdb_movie_id}?language=ko-KR&api_key=70b5f8cc0018e10bfcf6146a7aaf3dec`,
      })
        .then(res => {
          this.movieData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function (){
    this.atCreated()
  }
}

</script>

<style>

</style>