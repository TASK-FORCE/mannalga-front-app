<template>
  <ClubAlbumCreateAndEdit
    headerTitle="사진첩 수정"
    :submitCallback="editAlbum"
    :context="editContext"
    @back="moveToAlbumPostPage"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import ClubAlbumCreateAndEdit from '@/views/clubAlbumCreateAndEdit/ClubAlbumCreateAndEdit.vue';
import routerHelper from '@/router/RouterHelper';
import { generateParamPath, PATH } from '@/router/route_path_type';
import { mixin } from '@/mixin/mixin';
import { AlbumEditRequest, AlbumWriteContext, AlbumWriteRequest } from '@/interfaces/album';
import { UploadImageResponse } from '@/interfaces/common';
import { AlbumActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
  name: 'ClubAlbumEditPage',
  components: { ClubAlbumCreateAndEdit },
  mixins: [mixin],
  computed: {
    album() {
      return this.$store.state.album.album;
    },
    editContext(): AlbumWriteContext {
      if (this.album.albumSeq === 0) {
        this.$router.back();
      }
      return {
        title: this.album.title,
        image: this.album.image as UploadImageResponse,
      };
    }
  },
  methods: {
    moveToAlbumPostPage() {
      this.$router.push(generateParamPath(PATH.CLUB.ALBUM_POST, [routerHelper.clubSeq(), routerHelper.albumSeq()]))
    },
    editAlbum(albumWriteRequest: AlbumWriteRequest) {
      const albumEditRequest: AlbumEditRequest = {
        clubSeq: routerHelper.clubSeq(),
        albumSeq: routerHelper.albumSeq(),
        title: albumWriteRequest.title,
        image: albumWriteRequest.image
      };
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_EDIT, albumEditRequest)
        .then(() => {
          this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, routerHelper.clubSeq());
          this.moveToAlbumPostPage();
        });
    }
  },
});
</script>

<style scoped>

</style>
