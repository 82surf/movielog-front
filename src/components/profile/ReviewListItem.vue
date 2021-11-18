<template>
  <div >
    <p>관람일: {{ review.watched_at }}</p>
    <div v-if="review.thumbnail_path">
      <img :src="`https://image.tmdb.org/t/p/original/${review.thumbnail_path}`" alt="profile img" style="width:300px">
    </div>
    <!-- <p>tmdb_movie_id: {{ review.tmdb_movie_id }}</p> -->
    <p>oneline_review: {{ review.oneline_review }}</p>
    <p>quote: {{ review.quote }}</p>
    <p>좋아요: {{ review.like_count }}</p>

    <review-list-item-modal 
      :review="review"
      :paramUsername="paramUsername"
      @delete-review="deleteReview"
    ></review-list-item-modal>
      <!-- :class="{'modal fade':isSelected}"  -->
  
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
    }
  },
  components: {
    ReviewListItemModal,
  },
  props: {
    review: Object,
    paramUsername: String,
  },
  methods: {
    // onClick: function(){
    //   this.isSelected = !this.isSelected
    // }
    deleteReview: function(){
      this.$emit('delete-review')
    }
  }
} 
</script>

<style>

</style>