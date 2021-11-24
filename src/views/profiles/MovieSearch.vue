<template>
  <div class="container">
    <movie-search-form @input-change="inputChange"></movie-search-form>
    <search-movie-list :movieData="searchMovieData" :search-flag="searchFlag"></search-movie-list>
  </div>
</template>

<script>
import axios from 'axios'
import SearchMovieList from '@/components/movie_search/SearchMovieList.vue'
import MovieSearchForm from '@/components/movie_search/MovieSearchForm.vue'

const BASE_API_URL = `https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=${process.env.VUE_APP_API_KEY}&include_adult=false`
export default {
  name: 'ReviewForm',
  components: {
    SearchMovieList,
    MovieSearchForm,
  },
  data: function() {
    return {
      keyword: null,
      searchMovieData: null,
      searchFlag: false,
    }
  },
  methods: {
    inputChange: function(keyword) {
      const query = encodeURIComponent(keyword)

      const API_URL = `${BASE_API_URL}&query=${query}`
      axios({
        method: 'get',
        url: API_URL
      })
        .then(res =>{
          this.searchMovieData = res.data.results
          this.searchFlag = true
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>