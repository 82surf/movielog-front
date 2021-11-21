<!--
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
-->
<template>
    <div>
      <!-- <keep-alive>
        <component v-if="isMobile" :is="'IntroSwiper'" :swiperOption="mobileOption"></component>
      </keep-alive>
      <keep-alive>
        <component v-if="!isMobile" :is="'IntroSwiper'" :swiperOption="pcOption"></component>
      </keep-alive> -->
      <intro-swiper :swiper-option="mobileOption"></intro-swiper>
	</div>
</template>
<script>
import IntroSwiper from '@/components/IntroSwiper.vue'
export default {
  name: 'IntroPage',
  data() {
    return {
      isMobile: false,
      pcStandard: 769, // PC 화면의 Viewport 기준점
      mobileOption: { // 모바일 옵션 지정
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: true,
      },
      pcOption: { // PC 옵션 지정
        slidesPerView: 3,
      }
    }
  },
  methods: {
    checkIsMobile: function () {
      this.isMobile = (window.innerWidth < this.pcStandard)
    },
    handleResize: function () {
      this.$nextTick(function () {
        this.checkIsMobile()
      })
    }
  },
  created () {
    this.checkIsMobile()
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    IntroSwiper
  }
}
</script>