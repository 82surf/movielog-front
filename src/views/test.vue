<template>
  <div>
    <button @click="getMovies">GO</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'test',
  data: function() {
    return {
      sendData: {
        title : null,
        release_date : null,
        popularity : null,
        vote_count : null,
        vote_average : null,
        overview : null,
        poster_path : null,
      }
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getMovies: function() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=70b5f8cc0018e10bfcf6146a7aaf3dec&language=ko-KR&query=academy&page=1&include_adult=false`
      })
        .then(res => {
          console.log(res)
          this.sendData = res.data.results
          axios({
            method: 'post',
            url: `http://127.0.0.1:8000/movies/create/`,
            data: this.sendData,
            headers: this.setToken()
          })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>