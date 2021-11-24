<template>
  <div class="container my-5">
    <!-- 아이콘 svg -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </symbol>
    </svg>
    <!-- alert -->
    <div class="d-flex justify-content-center">
      <div class="alert alert-primary alert-dismissible fade show d-flex align-items-center w-75" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
        <div>
          좋아요, 팔로우 등의 활동을 많이 할 수록 더 정교한 추천을 받을 수 있어요 :D
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
    <!-- 로딩 화면 -->
    <div v-if="isLoading" class="d-flex justify-content-center loading-spinner">
      <div style="width: 2rem; height: 2rem;" class="spinner-grow text-primary me-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div style="width: 2rem; height: 2rem;" class="spinner-grow text-success me-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div style="width: 2rem; height: 2rem;" class="spinner-grow text-danger me-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div style="width: 2rem; height: 2rem;" class="spinner-grow text-warning me-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div style="width: 2rem; height: 2rem;" class="spinner-grow text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div v-if="likeBasedRecommendedMovie!==false">
        <movie-list-by-likes
        :movies="likeBasedRecommendedMovie"
        >
        </movie-list-by-likes>
      </div>

      <div v-if="followBasedRecommendedMovie.result!==false">
        <movie-list-by-follows
          :movies="followBasedRecommendedMovie"
        ></movie-list-by-follows>
      </div>

      <div v-if="followinglikeBasedRecommendedMovie.result!==false">
        <movie-list-by-following-likes
          :movies="followinglikeBasedRecommendedMovie"
        ></movie-list-by-following-likes>
      </div>

      <movie-list-by-random
        :movies="randomRecommendedMovie"
      ></movie-list-by-random>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import MovieListByLikes from '@/components/recommend_movie/MovieListByLikes.vue'
import MovieListByFollows from '@/components/recommend_movie/MovieListByFollows.vue'
import MovieListByFollowingLikes from '@/components/recommend_movie/MovieListByFollowingLikes.vue'
import MovieListByRandom from '@/components/recommend_movie/MovieListByRandom.vue'

export default {
  name: 'RecommendMovie',
  data: function() {
    return {
      likeBasedRecommendedMovie: null,
      followBasedRecommendedMovie: null,
      followinglikeBasedRecommendedMovie: null,
      randomRecommendedMovie: null,
      isLoading: true,
    }
  },
  components: {
    MovieListByRandom,
    MovieListByLikes,
    MovieListByFollows,
    MovieListByFollowingLikes,
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
          if (res.data.length > 0){
            this.likeBasedRecommendedMovie = res.data
          } else {
            this.likeBasedRecommendedMovie = false
          }
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
          if (res.result!==false){
          this.followBasedRecommendedMovie = res.data
          } else {
            this.followBasedRecommendedMovie = false
          }
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
          if (res.result!==false){
          this.followinglikeBasedRecommendedMovie = res.data
          } else {
            this.followinglikeBasedRecommendedMovie = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovieByRandom: function() {
      const randomPage = _.sample(_.range(1,11))

      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&region=KR&page=${randomPage}`
      })
        .then(res => {
          this.randomRecommendedMovie = res.data.results
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
    this.getMovieByRandom()
    setTimeout(() => {
      this.isLoading=false
    }, 1500)
  },
}

</script>

<style>
.loading-spinner {
  padding: 20vh 0;
}
.text-primary {
  background-color: #5cb1ff;
}
.text-success {
  background-color: #9df574;
}
.text-danger {
  background-color: #ff5c5c;
}
.text-warning {
  background-color: #ffdd65;
}
</style>