<template>
  <ClubAlbumCreateAndEdit
    headerTitle="사진첩 등록"
    :submitCallback="createAlbum"
    @back="moveToClubMainPage"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import ClubAlbumCreateAndEdit from '@/views/clubAlbumCreateAndEdit/ClubAlbumCreateAndEdit.vue';
import { AlbumWriteRequest } from '@/interfaces/album';
import routerHelper from '@/router/RouterHelper';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubAlbumCreatePage',
  components: { ClubAlbumCreateAndEdit },
  mixins: [mixin],
  methods: {
    createAlbum(albumWriteRequest: AlbumWriteRequest) {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_CREATE, albumWriteRequest)
        .then(() => {
          this.moveToClubMainPage();
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_IMAGE_REGISTER);
        });
    },
    moveToClubMainPage() {
      routerHelper.moveToClubMainPage();
    },
  },
});
</script>

<style scoped>

</style>
