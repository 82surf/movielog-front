<template>
  <div class="card card-body my-3">
    <div>
    <span>{{ comment.user.username }}</span>
    <span>{{ comment.content }}</span>
    <div class="text-end">
      <button @click="likeComment" :class="{'btn fas fa-heart fs-4 text-danger': likes, 'btn far fa-heart fs-4' : !likes } "><span>{{ comment.like_count }}</span></button>
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

<style>

</style>