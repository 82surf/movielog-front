<template>
  <div class="sw-container mt-5">
    <div class="by-random-header-container">
      <h2 class="by-random-header">요즘 인기 있는 영화!</h2>
      <div class="color-box"></div>
    </div>
    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="movie in movies"
        :key="movie.id"
        data-bs-toggle="modal"
        :data-bs-target="`#RandomModal${movie.id}`"
        style="width: 300px; height: 428px;"
      >
        <div class="poster-container">
          <img v-if="movie.poster_path !== 'image'" class="poster-img" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="">
          <div v-else class="default-poster d-flex justify-content-center align-items-center">
            <div>포스터가 없습니다.</div>
          </div>
          <div class="poster-label">{{ movie.title }}</div>
        </div>
        <br>
      </swiper-slide>
      <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
      <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
    </swiper>

    <!-- <iframe width="640px" height="360px" :src="`https://www.youtube.com/embed/BvNv6JDw8PQ?autoplay=1`"></iframe> -->
    <movie-list-by-random-item
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    ></movie-list-by-random-item>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import MovieListByRandomItem from '@/components/recommend_movie/MovieListByRandomItem.vue'

export default {
  name: 'MovieListByRandom',
  components: {
    MovieListByRandomItem,
    swiper,
    swiperSlide
  },
  data : function () {
    return {
      movieData: null,
      swiperOptions: {
        spaceBetween: 30,
        slidesPerView: 4,
        touchRatio: 0,
        setWrapperSize: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1290: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 1,
          },
          370: {
            slidesPerView: 1,
          }
        }
      },
    }
  },
  props: {
    movies: Array,
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
  created: function (){
  }
}
</script>

<style scoped>
.by-random-header-container {
  position: relative;
  height: 3rem;
}
.by-random-header {
  position: absolute;
  font-size: 24px;
  z-index: 1;
}
.sw-container .by-random-header-container .color-box {
  position: absolute;
  height: .8rem;
  width: 0;
  top: 18px;
  background-color: #ff5c5c;
  opacity: 90%;
  transition: .3s;
}
.sw-container:hover .by-random-header-container .color-box {
  width: 16rem;
}
.poster-container {
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: .5s;
}
.poster-container:hover {
  transform: scale(1.025);
}
.poster-container .poster-img {
  position: absolute;
  width: 300px;
  height: 428px;
  filter: brightness(100%);
  transition: .5s;
}
.poster-container:hover .poster-img {
  filter: brightness(30%);
}
.poster-container .default-poster {
  position: absolute;
  width: 300px;
  height: 428px;
  font-size: 14px;
  background-color: gray;
}
.poster-container .poster-label {
  position: absolute;
  font-weight: bold;
  width: 240px;
  bottom: -390px;
  left: 26px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -webkit-transition: opacity 1s ease-in-out;
}
.poster-container:hover .poster-label {
  opacity: 1;
  transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  -webkit-transition: opacity .5s ease-in-out;
}
</style>