<template>
  <div>
    <div class="list-group mt-4">
      <a
        type="button"
        class="list-group-item list-group-item-action"
        @click="goToProfile"
      >
        <div class="d-flex justify-content-between align-items-baseline">
          <h5 class="follower-username mt-2">{{ follower.username }}</h5>
          <div>
            <span v-if="isF4F">맞팔로우 중입니다.</span>
            <!-- <span>follower: {{ follower.follower_count }}  </span>
            <span>following: {{ follower.following_count }}</span> -->
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowerModal',
  data: function (){
    return {
      isF4F: null,
    }
  },
  props: {
    follower: Object,
    followingUser: Array,
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.follower.username }})
      this.location.reload(true)
    }
  },
  created: function() {
    if (this.followingUser.includes(this.follower.username)){
      this.isF4F=true
    } else {
      this.isF4F=false
    }
  }
}
</script>

<style scoped>
.follower-username {
  font-family: 'Reem Kufi', sans-serif;
}
</style>