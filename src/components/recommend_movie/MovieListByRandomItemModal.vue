<template>
  <div>
    <div class="modal fade" :id="`RandomModal${movie.id}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content" @keyup.esc="onCloseBtn">
          <!-- 모달 헤더 -->
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ movieData.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseBtn" @keyup.esc="onCloseBtn"></button>
          </div>
          <!-- 모달 바디 -->
          <div class="modal-body">
            <!-- 한줄평 -->
            <div class="mb-3 d-flex flex-column align-items-center">
              <div v-if="movieData.tagline" class="d-flex flex-column align-items-center">
                <i class="fas fa-quote-left" style="color: gray;"></i>
                <label for="message-text" class="col-form-label my-4 text-center" style="width: 550px; font-size: 18px">{{ movieData.tagline }}</label>
                <i class="fas fa-quote-right" style="color: gray;"></i>
              </div>
              <!-- 별점 -->
              <div class="star-ratings mt-4">
                <div
                  class="star-ratings-fill"
                  :style="{ width: ratingToPercent() + '%' }"
                >
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                </div>
                <div class="star-ratings-base">
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                  <span class="material-icons-round">grade</span>
                </div>
              </div>
            </div>
            <h5>줄거리</h5>
            <div>{{ movieData.overview }}</div>
            <div class="collapse multi-collapse mb-3" :id="`video-collapse-${movie.id}`">
              <hr>
              <h5>트레일러</h5>
              <div v-html="inHtml"></div>
            </div>
          </div>
          <!-- 모달 푸터 -->
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              :id="`collapse-btn-${movie.id}`"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#video-collapse-${movie.id}`"
              aria-expanded="true"
              @click="onCollapseBtn">
              트레일러보기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListByRandomItemModal',
  data: function() {
    return {
      isPlay: false,
      inHtml: `<div></div>`,
    }
  },
  props: {
    movieData: Object,
    videoKey: String,
    movie: Object,
  },
  methods: {
    ratingToPercent: function() {
      const score = this.movieData.vote_average * 10;
      return score + 1.5;
    },
    onCloseBtn: function() {
      if(this.videoKey !=='nothing'){
        if (this.isPlay){
          const collapseBtn = document.querySelector(`#collapse-btn-${this.movie.id}`)
          collapseBtn.click()
        }
        this.inHtml = '<div>  </div>'
      } else{
        this.inHtml = `<h3>재생할 예고편이 없습니다.</h3>`
      }
      this.isPlay = false
    },
    onCollapseBtn: function() {
      if(this.videoKey !=='nothing'){
        if (!this.isPlay){
          this.inHtml =  `<iframe width="100%" height="540px" src="https://www.youtube.com/embed/${this.videoKey}?autoplay=0"></iframe>`
          this.isPlay = true
        } else {
          this.inHtml = '<div></div>'
          this.isPlay = false
        }
      } else{
        this.inHtml = `<h5 class="text-center my-4">재생할 예고편이 없습니다.</h5>`
        this.isPlay = false
      }
    }
  },
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
</style>