<template>
  <div>
    <h1>TMDB 추천 상위 영화</h1>
    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="movie in movies"
        :key="movie.id"
        data-bs-toggle="modal" 
        :data-bs-target="`#RandomModal${movie.id}`"
        >
        <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="" style="width:300px; height:400px">
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
      },
    }
  },
  props: {
    movies: Array,
  },
  methods: {
  },
  created: function (){
  }
}
</script>

<style>
</style>