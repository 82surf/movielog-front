<template>
  <div>
    <div class="list-group mt-4">
      <a
        type="button"
        class="list-group-item list-group-item-action"
        @click="goToProfile"
      >
      <div class="d-flex w-100 justify-content-between align-items-center">
      <h5>{{ following.username }}</h5>
      <span v-if="isF4F">맞팔</span>
      <div>
        <span>follower: {{ following.follower_count }}  </span>
        <span>following: {{ following.following_count }}</span>

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

<style>

</style>