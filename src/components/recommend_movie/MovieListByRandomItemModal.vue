<template>
  <div>
    <div class="modal fade" :id="`RandomModal${movieData.id}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ movieData.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseBtn"></button>
          </div>
          <div class="modal-body">
            <div class="collapse multi-collapse mb-3" :id="`video-collapse-${movieData.id}`">
              <hr>
              <div v-html="inHtml"></div>
            </div>
          </div>
            
          <div class="modal-footer">
            <button 
              class="btn btn-primary" 
              :id="`collapse-btn-${movieData.id}`"
              type="button" 
              data-bs-toggle="collapse" 
              :data-bs-target="`#video-collapse-${movieData.id}`" 
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
  },
  methods: {
    onCloseBtn: function() {
      if(this.videoKey !=='nothing'){
        if (this.isPlay){
          const collapseBtn = document.querySelector(`#collapse-btn-${this.movieData.id}`)
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
        this.inHtml = `<h3>재생할 예고편이 없습니다.</h3>`
        this.isPlay = false
      }
    }
  },
}
</script>

<style>
</style>