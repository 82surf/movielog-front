<template>
  <div>
    <div class="card" aria-hidden="true" v-if="isLoading">
      <img src="../../assets/profile/default-image.jpg" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>


    <div v-else>
      <movie-list-by-genres></movie-list-by-genres>
      <movie-list-by-likes
        :movies="likeBasedRecommendedMovie"
      >
      </movie-list-by-likes>
      <hr>
      <movie-list-by-follows-item
        v-for="movie in followBasedRecommendedMovie"
        :key="movie.id"
        :movie="movie"
      ></movie-list-by-follows-item>
      <hr>
      
      <div class="swiper">
        <div class="swiper-wrapper">
          <!-- <movie-list-by-following-likes-item
            v-for="movie in followinglikeBasedRecommendedMovie"
            :key="movie.id"
            :movie="movie"
            ></movie-list-by-following-likes-item> -->
            <movie-list-by-following-likes-item></movie-list-by-following-likes-item>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-scrollbar"></div>
      </div>
      <hr>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieListByGenres from '@/components/recommend_movie/MovieListByGenres.vue'
// import MovieListByLikesItem from '@/components/recommend_movie/MovieListByLikesItem.vue'
import MovieListByLikes from '@/components/recommend_movie/MovieListByLikes.vue'
import MovieListByFollowsItem from '@/components/recommend_movie/MovieListByFollowsItem.vue'
import MovieListByFollowingLikesItem from '@/components/recommend_movie/MovieListByFollowingLikesItem.vue'
const API_KEY = '70b5f8cc0018e10bfcf6146a7aaf3dec'

export default {
  name: 'RecommendMovie',
  data: function() {
    return {
      likeBasedRecommendedMovie: null,
      followBasedRecommendedMovie: null,
      followinglikeBasedRecommendedMovie: null,
      isLoading: true,
    }
  },
  components: {
    MovieListByGenres,
    MovieListByLikes,
    MovieListByFollowsItem,
    MovieListByFollowingLikesItem,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getMovieByLikes : function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/recommendation/likes/`,
        headers: this.setToken()
      })
        .then(res => {
          this.likeBasedRecommendedMovie = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovieByFollows : function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/recommendation/follows/`,
        headers: this.setToken()
      })
        .then(res => {
          this.followBasedRecommendedMovie = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovieByFollowLikes : function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/recommendation/followings_likes/`,
        headers: this.setToken()
      })
        .then(res => {
          this.followinglikeBasedRecommendedMovie = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    onclickRecommend: function() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/{movie.id}/similar?api_key=${API_KEY}&language=ko-KR&`
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function() {
    this.getMovieByLikes()
    this.getMovieByFollows()
    this.getMovieByFollowLikes()
    setTimeout(() => {
      this.isLoading=false
    },0)
  },
}

</script>

<style>
</style>