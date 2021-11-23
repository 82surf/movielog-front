<template>
  <div>
    <div class="list-group mt-4">
      <a
        type="button"
        class="list-group-item list-group-item-action"
        @click="goToProfile"
      >
        <div class="d-flex justify-content-between align-items-baseline">
          <h5 class="following-username mt-2">{{ following.username }}</h5>
          <div>
            <span v-if="isF4F">맞팔로우 중입니다.</span>
            <!-- <span>follower: {{ following.follower_count }}  </span>
            <span>following: {{ following.following_count }}</span> -->
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowingModal',
  data: function (){
    return {
      isF4F:null,
    }
  },
  props: {
    following: Object,
    followerUser: Array,
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.following.username }})
      this.location.reload(true)
    }
  },
  created: function() {
    if (this.followerUser.includes(this.following.username)){
      this.isF4F=true
    } else {
      this.isF4F=false
    }
  }
}
</script>

<style scoped>
.following-username {
  font-family: 'Reem Kufi', sans-serif;
}
</style>