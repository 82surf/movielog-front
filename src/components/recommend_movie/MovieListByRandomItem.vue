<template>
  <div>
    <movie-list-by-random-item-modal 
      :movie-data="movieData"
      :video-key="videoKey"
      :movie="movie"
    ></movie-list-by-random-item-modal>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import MovieListByRandomItemModal from '@/components/recommend_movie/MovieListByRandomItemModal.vue'

export default {
  name: 'MovieListByRandomItem',
  components : {
    MovieListByRandomItemModal,
  },
  data : function () {
    return {
      movieData: null,
      videoKey: null,
    }
  },
  props: {
    movie: Object,
  },
  methods: {
    atCreated: function() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.movie.id}?language=ko-KR&api_key=70b5f8cc0018e10bfcf6146a7aaf3dec`,
      })
        .then(res => {
          this.movieData = res.data
          axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${res.data.id}/videos?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR`,
          })
            .then(response => {
              if (response.data.results.length < 1){
                this.videoKey = 'nothing'
                } else{
                // this.videoKey = response.data.results[0].key
                this.videoKey = _.sample(response.data.results).key
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function (){
    this.atCreated()
  },
}

</script>

<style>

</style>