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
      
    }
  },
  props: {
    following: Object,
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.following.username }})
      this.location.reload(true)
    }
  }
}
</script>

<style>

</style>
