<template>
  <div class="list-group mt-4">
    <a
      type="button"
      class="list-group-item list-group-item-action"
      @click="goToProfile"
      v-if="user.username"
    >
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h5>{{ user.username }}</h5>
        <small>{{ user.followers_count }}명이 팔로우 하고 있습니다.</small>
      </div>
    </a>
    <p v-else>검색결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: 'UserSearchResultItem',
  props: {
    user: Object
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.user.username }})
    }
  },
  
}
</script>

<style>

</style>