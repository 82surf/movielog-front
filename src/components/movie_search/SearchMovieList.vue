<template>
  <div>
    <div v-if="isLoading && searchFlag" class="d-flex justify-content-center loading-spinner">
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

    <search-movie-list-item
      v-show="!isLoading && searchFlag"
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
  data: function () {
    return {
      isLoading: true,
    }
  },
  props: {
    movieData: Array,
    searchFlag: Boolean,
  },
  watch: {
    searchFlag: function() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
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