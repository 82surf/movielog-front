<template>
  <div>
    <div class="modal fade" :id="`FollowLikeModal${reviewData.id}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true" >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content" @keyup.esc="onCloseBtn">
          <!-- 모달 헤더 -->
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ reviewData.movie_title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseBtn"></button>
          </div>
          <!-- 모달 바디 -->
          <div class="modal-body">
            <h5 class="text-center mt-3 mb-5">내 친구의 한줄평 &amp; 별점</h5>
            <!-- 한줄평 -->
            <div class="mb-3 d-flex flex-column align-items-center">
              <i class="fas fa-quote-left" style="color: gray;"></i>
              <label for="message-text" class="col-form-label my-4 text-center" style="width: 550px; font-size: 18px">{{ reviewData.oneline_review }}</label>
              <i class="fas fa-quote-right" style="color: gray;"></i>
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

            <div class="collapse multi-collapse mb-3" :id="`FollowLike-modal-video-collapse-${reviewData.id}`">
              <div v-html="inHtml"></div>
            </div>
          </div>
          <!-- 모달 푸터 -->
          <div class="modal-footer">
            <button 
              class="btn btn-primary" 
              :id="`FollowLike-modal-collapse-btn-${reviewData.id}`" 
              type="button" 
              data-bs-toggle="collapse" 
              :data-bs-target="`#FollowLike-modal-video-collapse-${reviewData.id}`" 
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
  name: 'MovieListByFollowsItemModal',
  data: function() {
    return {
      isPlay: false,
      inHtml: `<div></div>`,
    }
  },
  props: {
    movieData: Object,
    reviewData: Object,
    videoKey: String,
  },
  methods: {
    ratingToPercent: function() {
      const score = this.reviewData.rank * 20;
      return score + 1.5;
    },
    onCloseBtn: function() {
      if(this.videoKey !=='nothing'){
        if (this.isPlay){
          const collapseBtn = document.querySelector(`#FollowLike-modal-collapse-btn-${this.reviewData.id}`)
          collapseBtn.click()
        }
        this.inHtml = '<div>  </div>'
      } else{
        this.inHtml = `<h5 class="text-center my-4">재생할 예고편이 없습니다.</h5>`
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
        this.inHtml = `<h3>재생할 예고편이 없습니다.</h3>`
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