<template>
  <div>
    <movie-search-form @input-change="inputChange"></movie-search-form>
    <search-movie-list :movieData="searchMovieData"></search-movie-list>
    
  </div>
</template>

<script>
import axios from 'axios'
import SearchMovieList from '@/components/movie_search/SearchMovieList.vue'
import MovieSearchForm from '@/components/movie_search/MovieSearchForm.vue'

const API_KEY = '70b5f8cc0018e10bfcf6146a7aaf3dec'
const BASE_API_URL = `https://api.themoviedb.org/3/search/movie?language=ko-KR&api_key=${API_KEY}&include_adult=false`
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