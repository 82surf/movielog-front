<template>
  <div>
    <img :src="`http://127.0.0.1:8000${profile_image_path}`" alt="" style="width: 360px">
    <p>ID: {{ userInfo.username }}</p>
    <p>이 름 : {{ userInfo.name }}</p>
    <div v-if="username !== paramUsername && isPrivate">
      <p>follower: 비공개</p>
      <p>following: 비공개</p>
    </div>
    <div v-else>
      <p>follower:{{ userInfo.followerCount }}</p>
      <p>following:{{ userInfo.followingCount }}  </p>
    </div>
    <div v-if="username!==paramUsername">
      <button v-if="userInfo.isFollowing" @click="followToggle">Unfollow</button>
      <button v-else @click="followToggle">Follow</button>
    </div>
    <div v-else>
      <button @click="goToUpdate">회원 정보 수정</button>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data: function() {
    return {
      userInfo: {
        followerCount: null,
        followingCount: null,
        name: null,
        username: null,
        isFollowing: null,
      },
      isPrivate: null,
      selectedFile: null,
      profile_image_path: null,
    }
  },
  props: {
    paramUsername: String,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getUserinfo: function(){
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/info/${this.paramUsername}/`,
        headers: this.setToken()
      })
        .then(res => {
          this.userInfo.username = res.data.username
          this.userInfo.followerCount = res.data.follower_count
          this.userInfo.followingCount = res.data.following_count
          this.userInfo.name = res.data.name
          this.isPrivate = res.data.is_private
          this.userInfo.isFollowing = res.data.isFollowing
          this.$emit('togglePrivate', res.data.is_private)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProfileImage: function () {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/info/profile-image/${this.paramUsername}/`,
        headers: this.setToken()
      })
        .then(res => {
          this.profile_image_path = res.data.profile_image
        })
        .catch(err => {
          console.log(err)
        })
    },
    followToggle: function () {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/follow/${this.paramUsername}/`,
        headers: this.setToken()
      })
        .then(() => {
          this.getUserinfo()
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToUpdate: function () {
      this.$router.push({ name: 'CheckPassword'})
    },
  },
  created: function() {
    this.getUserinfo()
    this.getProfileImage()
  },
  computed: {
    ...mapState([
      'username',
    ]),
  },
  watch: {
    paramUsername: function () {
      this.getUserinfo()
    },
  }
}
</script>

<style>

</style>