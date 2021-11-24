<template>
  <div class="list-group mt-4">
    <a
      type="button"
      class="list-group-item list-group-item-action"
      @click="goToProfile"
      v-if="recommendUser.username"
    >
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h5>{{ recommendUser.username }}</h5>
        <small>{{ recommendUser.followers_count }}명이 팔로우 하고 있습니다.</small>
      </div>
    </a>
    <p v-else>검색결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: 'RecommendUser',
  props: {
    recommendUser: Object
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.recommendUser.username }})
    }
  },
  
}
</script>

<style>

</style>