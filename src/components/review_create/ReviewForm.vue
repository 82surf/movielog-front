<template>
  <div class="col ms-4">
    <!-- 별점 -->
    <div class="star-rating space-x-4 mx-auto mb-3">
      <input type="radio" id="5-stars" name="rating" value="5" v-model="sendData.rank">
      <label for="5-stars" class="star pr-4 material-icons-round">grade</label>
      <input type="radio" id="4-stars" name="rating" value="4" v-model="sendData.rank">
      <label for="4-stars" class="star material-icons-round">grade</label>
      <input type="radio" id="3-stars" name="rating" value="3" v-model="sendData.rank">
      <label for="3-stars" class="star material-icons-round">grade</label>
      <input type="radio" id="2-stars" name="rating" value="2" v-model="sendData.rank">
      <label for="2-stars" class="star material-icons-round">grade</label>
      <input type="radio" id="1-star" name="rating" value="1" v-model="sendData.rank">
      <label for="1-star" class="star material-icons-round">grade</label>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="oneline-review-label" style="font-weight: bold;">한줄평</span>
      <textarea type="text" class="form-control" placeholder="한줄평을 작성해주세요." v-model="sendData.oneline_review" aria-describedby="online-review-label" rows="3"></textarea>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="content-label" style="font-weight: bold;">영화 후기</span>
      <textarea class="form-control" placeholder="후기를 작성해주세요." v-model="sendData.content" aria-describedby="content-label" rows="8"></textarea>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="watched-at-label" style="font-weight: bold;">관람일</span>
      <input type="date" class="form-control" v-model="sendData.watched_at" aria-describedby="watched-at-label">
    </div>
    <div class="d-grid">
      <button class="btn btn-primary" @click="createReview">리뷰 저장하기</button>
    </div>
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
        watched_at: "2021-11-26",
        tmdb_movie_id: null,
        thumbnail_path: null,
        movie_title: null,
      }
    }
  },
  methods: {
    createReview: function() {
      this.sendData.tmdb_movie_id = (this.movieData.id || "id")
      this.sendData.thumbnail_path = (this.movieData.poster_path || "image")
      this.sendData.movie_title = (this.movieData.title || "title")
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
.star-ratings {
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order)*/
  -webkit-text-stroke-width: 1.3px;
  /* -webkit-text-stroke-color: #2b2a29; */
}
.star-ratings .material-icons-round {
  font-size: 2rem;
}
.star-ratings-fill {
  color: gold;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
.star-ratings-base {
  z-index: 0;
  padding: 0;
}

.star-rating {
display: flex;
flex-direction: row-reverse;
justify-content: space-around;
padding: 0 0.2em;
text-align: center;
width: 5em;
}
.star-rating .star {
  font-size: 2rem;
}
.star-rating input {
display: none;
}
.star-rating label {
-webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
-webkit-text-stroke-width: 1.3px;
-webkit-text-stroke-color: #2b2a29;
cursor: pointer;
}
.star-rating :checked ~ label {
-webkit-text-fill-color: gold;
}
.star-rating label:hover,
.star-rating label:hover ~ label {
-webkit-text-fill-color: #fff58c;
}
</style>