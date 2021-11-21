<template>
  <div>
    <img :src="`https://image.tmdb.org/t/p/original/${movie.thumbnail_path}`" alt="" style="width:200px">
    <br>
    {{ movieData.title }}
    <movie-list-by-following-likes-item-modal 
      :movie-data="movieData"
      :review-data="movie"
    ></movie-list-by-following-likes-item-modal>
  </div>
</template>

<script>
import axios from 'axios'
import MovieListByFollowingLikesItemModal from '@/components/recommend_movie/MovieListByFollowingLikesItemModal.vue'

export default {
  name: 'MovieListByFollowingLikesItem',
  components : {
    MovieListByFollowingLikesItemModal,
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
          // console.log(res)
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