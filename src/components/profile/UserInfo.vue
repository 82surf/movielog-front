<template>
  <div>
    <input type="file" @change="onFileSelected">
    <button @click="onUpload">업로드</button>
    <img src="" alt="">
    <p>ID: {{ userInfo.username }}</p>
    <p>이 름 : {{ userInfo.name }}</p>
    <p>follower:{{ userInfo.followerCount }}</p>
    <p>following:{{ userInfo.followingCount }}  </p>
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
      selectedFile: null,
    }
  },
  props: {
    paramUsername: String,
  },
  methods: {
    onFileSelected: function (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload: function () {
      const imageData = new FormData()
      imageData.append('image', this.selectedFile, this.selectedFile.name)
      axios({
        method: 'post',
        url: ``,
        data: imageData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
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
          this.userInfo.isFollowing = res.data.isFollowing
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
  },
  computed: {
    ...mapState([
      'username',
    ])
  },
  watch: {
    paramUsername: function() {
      this.getUserinfo()
    },
  }
}
</script>

<style>

</style>