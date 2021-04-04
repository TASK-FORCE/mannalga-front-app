<template>
  <div>
    <v-tabs
      v-model="tab"
      class="club-main-tab px-5"
      grow
    >
      <v-tab
        v-for="menu in menus"
        :key="menu.key"
        :href="`#${menu.key}`"
      >
        {{ menu.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-show="!$store.state.ui.loading"
      v-model="tab"
      :style="style"
    >
      <v-tab-item value="main">
        <ClubDetailMain
          :clubInfo="clubInfo"
          :currentUserInfo="currentUserInfo"
          :clubUserList="$store.state.club.clubUserList"
        />
      </v-tab-item>
      <v-tab-item value="meeting">
        <ClubDetailMeetingList :currentUserInfo="currentUserInfo" />
      </v-tab-item>
      <v-tab-item value="board">
        <ClubDetailBoardList :currentUserInfo="currentUserInfo" />
      </v-tab-item>
      <v-tab-item value="album">
        <ClubDetailAlbumList :currentUserInfo="currentUserInfo" />
      </v-tab-item>
    </v-tabs-items>
    <FixedScrollToTopBtn color="red" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeetingList from '@/views/clubDetail/components/meeting/ClubDetailMeetingList.vue';
import ClubDetailBoardList from '@/views/clubDetail/components/board/ClubDetailBoardList.vue';
import ClubDetailAlbumList from '@/views/clubDetail/components/album/ClubDetailAlbumList.vue';
import lastClubTabCache, { ClubTab } from '@/utils/cache/LastClubTabCache.ts';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.ts';
import { PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import { ClubInfo, CurrentUserInfo } from '@/interfaces/club.ts';
import FixedScrollToTopBtn from '@/components/button/FixedScrollToTopBtn.vue';

export default Vue.extend({
  name: 'ClubDetailPageBody',
  components: { FixedScrollToTopBtn, ClubDetailMain, ClubDetailMeetingList, ClubDetailBoardList, ClubDetailAlbumList },
  data() {
    return {
      tab: ClubTab.MAIN as ClubTab,
      menus: [
        { name: '메인', key: ClubTab.MAIN },
        { name: '만남', key: ClubTab.MEETING },
        { name: '게시판', key: ClubTab.BOARD },
        { name: '사진첩', key: ClubTab.ALBUM },
      ],
      style: {},
    };
  },
  computed: {
    clubSeq: () => routerHelper.clubSeq(),
    clubInfo(): ClubInfo {
      return this.$store.state.club.clubInfo;
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
  },
  watch: {
    tab() {
      lastClubTabCache.save(this.clubSeq, this.tab);
    },
  },
  mounted() {
    this.tab = lastClubTabCache.get(this.clubSeq);
    if (this.clubInfo.seq === 0) {
      clubDetailVuexService.dispatch(this.clubSeq, true, PATH.CLUB_LIST);
    }
    this.$nextTick(() => {
      const header = document.querySelector('.club-main-tab');
      if (header) {
        this.style = {
          paddingTop: `${header.clientHeight}px`,
        };
      }
    });
  },
});
</script>

<style
  scoped
  lang="scss"
>
.club-main-tab {
  position: fixed;
  z-index: 5;
  background-color: #FFFFFF;
}

.theme--dark {
  .club-main-tab {
    background-color: #121212;
  }
}
</style>
