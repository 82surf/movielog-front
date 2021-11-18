<template>
  <div>
    <label for="rank">별점</label>
    <select v-model="sendData.rank" id="rank">
      <option value="5">★★★★★</option>
      <option value="4">★★★★</option>
      <option value="3">★★★</option>
      <option value="2">★★</option>
      <option value="1">★</option>
    </select>
    <p>
      <label for="onelineReview">한줄평</label>
      <input type="text" id="onelineReview" v-model="sendData.oneline_review">
    </p>
    <p>
      <label for="quote">명대사</label>
      <input type="text" id="quote" v-model="sendData.quote">
    </p>
    <p>
      <label for="content">리뷰내용</label>
      <textarea name="" id="" v-model="sendData.content" cols="30" rows="5"></textarea>
    </p>
    <p>
      <label for="watched">관람일자</label>
      <input type="date" id="watched" v-model="sendData.watched_at">
    </p>
    <button @click="createReview">CREATE</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReviewForm',
  data: function(){ 
    return {
      sendData:{
        rank: 5,
        oneline_review: null,
        content:null,
        quote: null,
        watched_at: null,
        tmdb_movie_id: null,
        thumbnail_path: null,
        movie_title: null,
      }
    }
  },
  methods: {
    createReview: function() {
      console.log(this.sendData)
      this.sendData.tmdb_movie_id = this.movieData.id
      this.sendData.thumbnail_path = this.movieData.poster_path
      this.sendData.movie_title = this.movieData.title
      this.$emit('create-review', this.sendData)
    }
  },
  computed: {
    ...mapState([
      'movieData'
    ])
  }
}
</script>

<style>

</style>