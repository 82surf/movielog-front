<template>
  <div class="card card-body my-3">
    <div class="d-flex justify-content-between">
      <div>
        <span class="comment-username me-2" @click="goToProfile">{{ comment.user.username }}</span>
        <span class="comment-content">{{ comment.content }}</span>
      </div>
      <div class="btn-container">
        <i @click="likeComment" v-show="!likes" class="material-icons like-btn like-btn__inactive me-2">favorite</i>
        <i @click="likeComment" v-show="likes" class="material-icons like-btn like-btn__active me-2">favorite</i>
        <span class="me-2">{{ comment.like_count }} Likes</span>
        <button v-if="username===comment.user.username" @click="deleteComment" class="text-end btn-close"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name :'ReviewListItemModalComment',
  props: {
    comment: Object,
  },
  data: function () {
    return {
      likes: this.comment.like_users.some(arr => {
        return arr.username === this.username
      }),
    }
  },
  methods: {
    goToProfile: function () {
      this.$emit('go-to-profile', this.comment.user.username)
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    deleteComment : function() {
      axios({
        method: 'DELETE',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/comment_detail/${this.comment.id}/`,
        headers: this.setToken(),
      })
        .then(() => {
          this.$emit('delete-comment')
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeComment: function() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/comment_detail/${this.comment.id}/likes/`,
        headers: this.setToken(),
      })
        .then(() => {
          this.$emit('delete-comment')
          this.likes = !this.likes
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    // username: function () {
    //   return this.$store.state.username
    // },
    ...mapState([
      'username'
    ])
  }
}
</script>

<style scoped>
.btn-container {
  display: flex;
  align-items: center;
}
.comment-username {
  font-family: 'Reem Kufi', sans-serif;
}
.comment-content {
  font-family: 'Noto Sans KR', sans-serif;
}
.like-btn {
  font-size: 1rem;
  cursor: pointer;
}
.like-btn__active {
  color: red;
}
.like-btn__inactive {
  color: gray;
}
</style>