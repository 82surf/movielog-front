<template>
  <div>
    <div class="modal fade" :id="`Modal${reviewData.id}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ reviewData.title }}</h5>
            <button @click="onclick">DDD</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <label for="message-text" class="col-form-label">한줄평: {{ reviewData.oneline_review }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">명대사: {{ reviewData.quote }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">관람일: {{ reviewData.watched_at }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">평점: {{ reviewData.rank }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">내용: {{ reviewData.content }}</label>
              </div>
          </div>
            
          <div class="modal-footer">
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListByLikesItemModal',
  props: {
    movieData: Object,
    reviewData: Object,
  },
  methods: {
    onclick: function() {
      console.log(this.movieData)
    }
  },
}
</script>

<style>
</style>