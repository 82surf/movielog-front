<template>
  <div>
    <div class="modal fade" :id="`Modal${review.pk}`" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header justify-content-between">
            <h5 class="modal-title" id="exampleModalLabel">{{ review.movie_title }}</h5>
            <div class="star-ratings mx-5">
              <div 
                class="star-ratings-fill space-x-2"
                :style="{ width: ratingToPercent() + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base space-x-2">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <div v-if="paramUsername===username">
              <button type="button" class="btn btn-secondary" :data-bs-target="`#Modal${review.pk}update`" data-bs-toggle="modal" >수정하기</button>
            </div>
            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
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
                <label for="message-text" class="col-form-label">내용: {{ review.content }}</label>
              </div>
            <div class="collapse multi-collapse mb-3" id="commentCollapse">
              <hr>
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
            
          <div class="modal-footer justify-content-between">
            <p>
            <button @click="likeReview" :class="[{'btn fas fa-heart fs-3 text-danger': likes, 'btn far fa-heart fs-3' : !likes, },'text-nowrap']"></button>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#commentCollapse" aria-expanded="false" aria-controls="collapseExample">
                댓글
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
            <div class="star-rating space-x-4 mx-auto">
              <input type="radio" :id="`5-stars${review.pk}`" :name="`rating${review.pk}`" value="5" v-model="review.rank">
              <label :for="`5-stars${review.pk}`" class="star pr-4 fs-3">★</label>
              <input type="radio" :id="`4-stars${review.pk}`" :name="`rating${review.pk}`" value="4" v-model="review.rank">
              <label :for="`4-stars${review.pk}`" class="star fs-3">★</label>
              <input type="radio" :id="`3-stars${review.pk}`" :name="`rating${review.pk}`" value="3" v-model="review.rank">
              <label :for="`3-stars${review.pk}`" class="star fs-3">★</label>
              <input type="radio" :id="`2-stars${review.pk}`" :name="`rating${review.pk}`" value="2" v-model="review.rank">
              <label :for="`2-stars${review.pk}`" class="star fs-3">★</label>
              <input type="radio" :id="`1-star${review.pk}`" :name="`rating${review.pk}`" value="1" v-model="review.rank">
              <label :for="`1-star${review.pk}`" class="star fs-3">★</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" :id="`not-private-update-input${review.pk}`" v-model="isPrivate">
              <label class="form-check-label" :for="`not-private-update-input${review.pk}`">팔로워에게만 공개</label>
            </div>
            <button type="button" class="btn btn-secondary" :data-bs-target="`#Modal${review.pk}`" data-bs-toggle="modal" @click="updateReview">수정완료</button>
            <button type="button" class="btn btn-danger" :data-bs-target="`#Modal${review.pk}delete`"  data-bs-toggle="modal">일기삭제</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <!-- <div class="mb-3">
                <span>한줄평:</span>
                <input type="text" v-model="review.oneline_review">
              </div> -->
              <div class="input-group mb-3">
                <span class="input-group-text" id="oneline-review-label">한줄평</span>
                <input type="text" class="form-control" placeholder="한줄평" v-model="review.oneline_review" aria-describedby="online-review-label">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="quote-label">명대사</span>
                <input type="text" class="form-control" placeholder="명대사" v-model="review.quote" aria-describedby="quote-label">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="watched-at-label">관람일</span>
                <input type="date" class="form-control" placeholder="관람일" v-model="watched_at" aria-describedby="watched-at-label">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="content-label">후기</span>
                <textarea class="form-control" placeholder="후기" v-model="review.content" aria-describedby="content-label"></textarea>
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
      watched_at: this.review.watched_at,
      isPrivate: this.review.is_private,
    }
  },
  methods: {
    ratingToPercent:function() {
      const score = this.review.rank * 20;
      return score + 1.5;
    },
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
        watched_at: this.watched_at,
        tmdb_movie_id: this.review.tmdb_movie_id,
        thumbnail_path: this.review.thumbnail_path,
        movie_title: this.review.movie_title,
        is_private: this.isPrivate
      }
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/review_detail/${this.username}/${this.review.pk}/`,
        headers: this.setToken(),
        data: updateData
      })
        .then(() => {
          this.$emit('delete-review')
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
        .then(() => {
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
        .then(() => {
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
        .then(() => {
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
    ]),
  }
}
// 뒤로가기 했을 때, 모달 사라지도록 refresh
window.addEventListener('popstate', function () {
  this.location.reload(true)
})
</script>

<style scoped>
.updatebtn {
  margin-left: 450px;
}
.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  font-size: 2.25rem;
  line-height: 2.5rem;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order)*/
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
 
 .star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
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
font-size: 2.25rem;
line-height: 2.5rem;
justify-content: space-around;
padding: 0 0.2em;
text-align: center;
width: 5em;
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