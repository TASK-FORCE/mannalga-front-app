<template>
  <div>
    <MenuHeader
      title="사진첩"
      :menus="menus"
      @back="moveToClubDetailPath"
    />
    <ClubAlbumPostBody :album="album" />
    <YesOrNoDialog
      v-model="openDeleteDialog"
      title="사진첩을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteAlbum"
    />
  </div>
</template>

<script lang="ts">
import ClubAlbumPostBody from '@/views/clubAlbumPost/ClubAlbumPostBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue from 'vue';
import MenuHeader from '@/components/header/MenuHeader.vue';
import { Album } from '@/interfaces/album';
import { ClickWithText } from '@/interfaces/common';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { CurrentUserInfo } from '@/interfaces/club';
import { mixin } from '@/mixin/mixin';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';

export default Vue.extend({
  name: 'ClubAlbumPostPage',
  components: { YesOrNoDialog, MenuHeader, ClubAlbumPostBody },
  mixins: [mixin],
  data() {
    return {
      openDeleteDialog: false,
    };
  },
  computed: {
    album(): Album {
      return this.$store.state.album.album;
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
    isWriter(): boolean {
      return this.album.writer.writerUserSeq === this.currentUserInfo.userSeq;
    },
    editMenu(): ClickWithText {
      return {
        text: '수정',
        click: () => (this.moveToEditPagePath())
      }
    },
    deleteMenu(): ClickWithText {
      return {
        text: '삭제',
        click: () => (this.openDeleteDialog = true)
      }
    },
    menus(): ClickWithText [] {
      if (this.isWriter) {
        return [this.editMenu, this.deleteMenu]
      }

      if (this.currentUserInfo.isManager || this.currentUserInfo.isMaster) {
        return [this.deleteMenu];
      }
      return [];
    },
  },
  methods: {
    moveToClubDetailPath() {
      this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]));
    },
    moveToEditPagePath() {
      this.$router.push(generateParamPath(PATH.CLUB.ALBUM_EDIT, [routerHelper.clubSeq(), routerHelper.albumSeq()]));
    },
    deleteAlbum() {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_DELETE, {
        clubSeq: routerHelper.clubSeq(),
        albumSeq: routerHelper.albumSeq(),
      })
        .then(() => {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_DELETE_ALBUM);
          this.moveToClubDetailPath();
        });
    }
  },
});
</script>

<style scoped>

</style>
