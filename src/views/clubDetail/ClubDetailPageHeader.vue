<template>
  <v-app-bar
    class="elevation-0"
    app
  >
    <v-btn
      icon
      class="back-btn"
      @click="moveToClubListPage"
    >
      <v-icon v-text="'$back'" />
    </v-btn>
    <div class="header-club-name">{{ $store.state.club.clubInfo.name }}</div>
    <v-spacer />
    <UserSettingPageEnterAvatar />
  </v-app-bar>
</template>

<script lang="ts">
import { PATH } from '@/router/route_path_type.ts';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.ts';
import lastScrollPositionCache from '@/utils/cache/LastScrollPositionCache.ts';
import lastClubTabCache, { ClubTab } from '@/utils/cache/LastClubTabCache.ts';
import routerHelper from '@/router/RouterHelper.ts';
import UserSettingPageEnterAvatar from '@/components/UserSettingPageEnterAvatar.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'ClubDetailPageHeader',
  components: { UserSettingPageEnterAvatar },
  data() {
    return {
      clubListPath: PATH.CLUB_LIST,
    };
  },
  methods: {
    moveToClubListPage() {
      lastScrollPositionCache.init(this.$route.fullPath);
      lastClubTabCache.save(routerHelper.clubSeq(), ClubTab.MAIN);
      this.$router.push(this.clubListPath);
      clubDetailVuexService.reset();
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.header-club-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: bold;
  color: #292929;
}

.back-btn {
  color: #292929 !important;
}

.theme--dark {
  .header-club-name, .back-btn {
    color: #F5F5F5 !important;
  }
}
</style>
