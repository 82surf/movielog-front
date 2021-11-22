<template>
  <div>
    <div class="modal fade" id="FollowingModal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header justify-content-between">
            <h5 class="modal-title" id="FollowingModalLabel">Followings</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <following-modal-item
              v-for="following in followings"
              :key="following.username"
              :following="following"
              data-bs-dismiss="modal"
            >
            </following-modal-item>
          </div>
          <div class="modal-footer justify-content-between">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FollowingModalItem from '@/components/profile/FollowingModalItem.vue'
export default {
  name: 'FollowingsModal',
  data: function (){
    return {
      
    }
  },
  components: {
    FollowingModalItem,
  },
  props: {
    followings: Array,
    followerUser: Array,
  },

}
</script>

<style>

</style>
