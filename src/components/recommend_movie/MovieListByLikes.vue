<template>
  <div>
    <h1>내가 좋아요를 누른 영화</h1>
    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="movie in movies"
        :key="movie.id"
        data-bs-toggle="modal" 
        :data-bs-target="`#LikeModal${movie.id}`"
        >
        <img :src="`https://image.tmdb.org/t/p/original/${movie.thumbnail_path}`" alt="" style="width:300px; height:400px">
        <br>
      </swiper-slide>
      <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
      <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
    </swiper>
  
    <movie-list-by-likes-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    ></movie-list-by-likes-item>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import MovieListByLikesItem from '@/components/recommend_movie/MovieListByLikesItem.vue'

export default {
  name: 'MovieListBylikeItem',
  components: {
    MovieListByLikesItem,
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