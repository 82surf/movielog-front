<template>
  <div>
    <search-movie-list-item
      v-for="movie in movieData"
      :key="movie.id"
      :movie="movie"
    >
    </search-movie-list-item>
  </div>
</template>

<script>
import SearchMovieListItem from '@/components/movie_search/SearchMovieListItem.vue'

export default {
  name: 'SearchMovieList',
  components: {
    SearchMovieListItem,
  },
  props: {
    movieData: Array,
  },
  methods: {
  }
}
</script>

<style>

</style>