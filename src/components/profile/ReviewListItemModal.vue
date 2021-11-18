<template>
  <div>
    <div class="modal fade" :id="`Modal${review.pk}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ review.movie_title }}</h5>
            <button @click="likeReview" :class="{'btn fas fa-heart fs-3 text-danger': likes, 'btn far fa-heart fs-3' : !likes }"></button>
            <div v-if="paramUsername===username">
              <button type="button" class="btn btn-secondary" :data-bs-target="`#Modal${review.pk}update`" data-bs-toggle="modal" >수정하기</button>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <label for="message-text" class="col-form-label">한줄평: {{ review.oneline_review }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">명대사: {{ review.quote }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">관람일: {{ review.watched_at }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">평점: {{ review.rank }}</label>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">내용: {{ review.content }}</label>
              </div>
            <div class="collapse multi-collapse mb-3" id="commentCollapse">
              <input type="text" v-model.trim="commentInput" @keyup.enter="createComment">
              <review-list-item-modal-comment 
                v-for="comment in review.comment_set"
                :key="comment.id"
                :comment="comment"
                :username="username"
                @delete-comment="deleteComment"
              >
              </review-list-item-modal-comment>
            </div>
          </div>
            
          <div class="modal-footer">
            <p>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#commentCollapse" aria-expanded="false" aria-controls="collapseExample">
                댓글보기
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" :id="`Modal${review.pk}update`" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ review.movie_title }}</h5>
              <button type="button" class="btn btn-secondary" :data-bs-target="`#Modal${review.pk}`" data-bs-toggle="modal" @click="updateReview">수정완료</button>
              <button type="button" class="btn btn-danger" :data-bs-target="`#Modal${review.pk}delete`"  data-bs-toggle="modal">일기삭제</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                <span>한줄평:</span>
                <input type="text" v-model="review.oneline_review">
              </div>
              <div class="mb-3">
                <span>명대사:</span>
                <input type="text" v-model="review.quote">
              </div>
              <div class="mb-3">
                <span>관람일:</span>
                <input type="date" v-model="review.watched_at">
              </div>
              <div class="mb-3">
                <span>평점: </span>
                <input type="text" v-model="review.rank">
              </div>
              <div class="mb-3">
                <span>내용: </span>
                <textarea v-model="review.content" class="form-control"></textarea>
              </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" :id="`Modal${review.pk}delete`" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">삭제하시겠습니까 ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :data-bs-target="`#Modal${review.pk}update`"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="deleteReview" data-bs-dismiss="modal" aria-label="Close">네</button>
            <button type="button" class="btn btn-secondary" :data-bs-target="`#Modal${review.pk}update`" data-bs-toggle="modal" data-bs-dismiss="modal">아니요</button>
          </div>
        </div>
      </div>
    </div>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#Modal${review.pk}`">상세정보</button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ReviewListItemModalComment from '@/components/profile/ReviewListItemModalComment.vue'

export default {
  name: 'ReviewListItemModal',
  components: {
    ReviewListItemModalComment,
  },
  props: {
    review:Object,
    paramUsername:String,
  },
  data: function() {
    return {
      likes: null,
      commentInput: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    updateReview : function () {
      const updateData = {
        rank: this.review.rank,
        oneline_review: this.review.oneline_review,
        content: this.review.content,

        quote: this.review.quote,
        watched_at: this.review.watched_at,
        tmdb_movie_id: this.review.tmdb_movie_id,
        thumbnail_path: this.review.thumbnail_path,
        movie_title: this.review.movie_title
      }
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/review_detail/${this.username}/${this.review.pk}/`,
        headers: this.setToken(),
        data: updateData
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteReview: function() {
      axios({
        method: 'delete',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/review_detail/${this.username}/${this.review.pk}/`,
        headers: this.setToken(),
      })
        .then(res => {
          console.log(res)
          this.$emit('delete-review')
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeReview: function() {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/review_detail/${this.paramUsername}/${this.review.pk}/likes/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.likes = !this.likes
          this.$emit('delete-review')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function() {
      this.$emit('delete-review')
    },
    createComment: function() {
      const sendData = {
        content: this.commentInput
      }
      if (this.commentInput){
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/comments/${this.paramUsername}/${this.review.pk}/`,
        headers: this.setToken(),
        data: sendData,
      })
        .then(res => {
          console.log(res)
          this.commentInput = ''
          this.$emit('delete-review')
          
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  },
  created: function() {
    axios({
      method: 'get',
      url: `${process.env.VUE_APP_SERVER_URL}/profiles/review_detail/${this.paramUsername}/${this.review.pk}/`,
      headers: this.setToken(),
      data:{
        'content' : this.commentInput
      }
    })
      .then(res => {
        this.likes = res.data.is_like
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    ...mapState([
      'username'
    ])
  }
}
</script>

<style>

</style>