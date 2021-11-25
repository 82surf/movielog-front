<template>
  <div>
    <div class="user-info">
      <!-- 프로필 사진 -->
      <img class="profile-img" :src="`http://127.0.0.1:8000${profile_image_path}`" alt="profile-img">

      <div class="user-info-container">
        <div class="username-wrapper">
          <!-- 유저네임(아이디) -->
          <div class="username">{{ userInfo.username }}</div>

          <!-- 내 페이지: 회원정보수정 버튼 / 남 페이지: 팔로우 버튼 -->
          <div class="user-info-btn-group">
            <div v-if="username!==paramUsername">
              <div v-if="!isPrivate">
                <a class="btn btn-primary follow-btn" v-if="userInfo.isFollowing" @click="followToggle">Unfollow</a>
                <a class="btn btn-primary follow-btn" v-else @click="followToggle">Follow</a>
              </div>
            </div>
            <div v-else>
              <div class="settings-btn">
                <i class="material-icons-sharp settings-ico" data-bs-toggle="modal" data-bs-target="#checkPasswordModal">settings</i>
                <div class="settings-bg"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 팔로워 수 -->
        <div class="follow-info">
          <div v-if="username !== paramUsername && isPrivate">
            <div>비공개 계정입니다.</div>
          </div>
          <div v-else>
            <div class="d-inline" data-bs-toggle="modal" data-bs-target="#FollowerModal">
              <span class="follower-count">{{ userInfo.followerCount }}</span>
              <span class="follower-label">followers</span>
            </div>
            <div class="d-inline" data-bs-toggle="modal" data-bs-target="#FollowingModal">
              <span class="following-count">{{ userInfo.followingCount }}</span>
              <span class="following-label">followings</span>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-secondary btn-sm mt-2" v-if="username===paramUsername" @click="goToReviewForm">리뷰 작성하기</button>
      </div>
    </div>
    <hr>
    <followers-modal
      :followers="followers"
      :followingUser="followingUser"
    ></followers-modal>
    <followings-modal
      :followings="followings"
      :followerUser="followerUser"
      :my-follower="myFollower"
    ></followings-modal>
    <check-password @get-user-info="getUserinfo"></check-password>
  </div>
</template>

<script>
import CheckPassword from '@/components/accounts/CheckPassword.vue'
import FollowersModal from '@/components/profile/FollowersModal.vue'
import FollowingsModal from '@/components/profile/FollowingsModal.vue'

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
      followers: null,
      followings: null,
      followingUser: null,
      followerUser: null,
      myFollower: null,
    }
  },
  components: {
    CheckPassword,
    FollowersModal,
    FollowingsModal
  },
  props: {
    paramUsername: String,
  },
  methods: {
    goToReviewForm: function () {
      this.$router.push({ name: 'MovieSearch' })
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
          this.followingUser = res.data.followings.map(user => {
            return user.username
          })
          this.followerUser = res.data.followings.map(user => {
            return user.username
          })
          this.myFollower = res.data.my_follower.map(user => {
            return user.username
          })
          this.followingUser.push('a')
          this.followers = res.data.followers
          this.followings = res.data.followings
          this.userInfo.username = res.data.username
          this.userInfo.followerCount = res.data.follower_count
          this.userInfo.followingCount = res.data.following_count
          this.userInfo.name = res.data.name
          this.isPrivate = res.data.is_private
          this.userInfo.isFollowing = res.data.isFollowing
          this.getProfileImage()
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
  },
  created: function() {
    this.getUserinfo()
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

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 40px;
  font-family: 'Reem Kufi', sans-serif;
}
.user-info .profile-img {
  width: 150px;
  border-radius: 20px;
}
.user-info .user-info-container {
  margin-left: 24px;
}
.user-info .user-info-container .username-wrapper {
  display: flex;
  align-items: center;
}
.user-info .user-info-container .username-wrapper .username {
  font-size: 28px;
  margin-right: 16px;
}
.user-info .user-info-container .username-wrapper .user-info-btn-group .follow-btn {
  height: 30px;
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
}
.user-info .user-info-container .username-wrapper .user-info-btn-group .settings-btn {
  position: relative;
  cursor: pointer;
}
.user-info .user-info-container .username-wrapper .user-info-btn-group .settings-btn .settings-ico{
  position: absolute;
  top: 4px;
  left: 4px;
  color: white;
  font-size: 24px;
}
.user-info .user-info-container .username-wrapper .user-info-btn-group .settings-btn .settings-bg {
  background-color: #6c757d;
  width: 32px;
  height: 32px;
  border-radius: 5px;
}
.user-info .follow-info .follower-count,.following-count{
  font-size: 28px;
  margin-right: 8px;
}
.user-info .follow-info .follower-label,.following-label{
  font-size: 16px;
}
.user-info .follow-info .follower-label{
  margin-right: 36px;
}
</style>