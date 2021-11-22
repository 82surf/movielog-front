<template>
  <div >
    <div class="card" aria-hidden="true" v-if="isLoading">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>
    <div v-else>
      <div v-if="!review.is_private||paramUsername===username">
      <div data-bs-toggle="modal" :data-bs-target="`#Modal${review.pk}`">
        <p>관람일: {{ review.watched_at }}</p>
        <div v-if="review.thumbnail_path">
          <img :src="`https://image.tmdb.org/t/p/original/${review.thumbnail_path}`" alt="profile img" style="width:300px">
        </div>
        <p>oneline_review: {{ review.oneline_review }}</p>
        <p>quote: {{ review.quote }}</p>
        <p>좋아요: {{ review.like_count }}</p>
        <p>{{ year}}</p>
      </div>
      <review-list-item-modal 
        :review="review"
        :paramUsername="paramUsername"
        @delete-review="deleteReview"
      ></review-list-item-modal>
      </div>
    </div>
  <hr>
  </div>
</template>

<script>
import ReviewListItemModal from '@/components/profile/ReviewListItemModal.vue'
export default {
  name: 'ReviewListItem',
  data: function () {
    return {
      isSelected: false,
      isLoading: true,
      year : new Date(this.review.watched_at).getFullYear(),
    }
  },
  components: {
    ReviewListItemModal,
  },
  props: {
    review: Object,
    paramUsername: String,
    username: String,
  },
  methods: {
    // onClick: function(){
    //   this.isSelected = !this.isSelected
    // }
    deleteReview: function(){
      this.$emit('delete-review')
    }
  },
  created: function(){
    setTimeout(() => {
      this.isLoading=false
    }, 20)
  },
  computed: {
    
  }
} 
</script>

<style>

</style>