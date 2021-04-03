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
import { generateParamPath, PATH } from '@/router/route_path_type';

export default Vue.extend({
  name: 'ClubAlbumCreatePage',
  components: { ClubAlbumCreateAndEdit },
  methods: {
    createAlbum(albumWriteRequest: AlbumWriteRequest) {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_CREATE, albumWriteRequest)
        .then(() => {
          this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, routerHelper.clubSeq());
          this.moveToClubMainPage();
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_IMAGE_REGISTER);
        });
    },
    moveToClubMainPage() {
      this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]))
    },
  },
});
</script>

<style scoped>

</style>
