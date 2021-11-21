<template>
  <div class="card card-body mb-3">
    <span>{{ comment.user.username }}</span>
    <span>{{ comment.content }}</span>
    <button v-if="username===comment.user.username" @click="deleteComment" >X</button>
    <button @click="likeComment" :class="{'btn fas fa-heart fs-3 text-danger': likes, 'btn far fa-heart fs-3' : !likes }"><span>{{ comment.like_count }}</span></button>
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