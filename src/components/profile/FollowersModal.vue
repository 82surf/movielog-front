<template>
  <div>
    <div class="modal fade" id="FollowerModal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header justify-content-between">
            <h5 class="modal-title" id="FollowerModalLabel">Followers</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <follower-modal-item
              v-for="follower in followers"
              :key="follower.username"
              :follower="follower"
              :followingUser="followingUser"
              data-bs-dismiss="modal"
            >
            </follower-modal-item>
          </div>
          <div class="modal-footer justify-content-between">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FollowerModalItem from '@/components/profile/FollowerModalItem.vue'
export default {
  name: 'FollowersModal',
  data: function (){
    return {
      
    }
  },
  components: {
    FollowerModalItem,
  },
  props: {
    followers: Array,
    followingUser: Array,
  },

}
</script>

<style>

</style>
