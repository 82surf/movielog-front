<template>
  <div class="card card-body mb-3">
    <span>{{ comment.user.username }}</span>
    <span>{{ comment.content }}</span>
    <button v-if="username===comment.user.username" @click="deleteComment" >X</button>
  </div>
</template>

<script>
import axios from 'axios'
// import mapState from 'vuex'
export default {
  name :'ReviewListItemModalComment',
  props: {
    comment: Object,
    username: String,
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
        .then(res => {
          console.log(res)
          this.$emit('delete-comment')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    // username: function () {
    //   return this.$store.state.username
    // }
    // ...mapState([
    //   'username'
    // ])
  }
}
</script>

<style>

</style>