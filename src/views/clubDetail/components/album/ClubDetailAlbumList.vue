<template>
  <div>
    <InfiniteScrollTemplate
      name="album"
      :firstPageCallback="fetchFirstPage"
      :nextPageCallback="fetchNextPage"
      :pageElements="twoAlbumsList"
      :pageInfo="albumPage"
      :withListGroup="false"
    >
      <template v-slot:list-main>
        <v-row
          v-for="(twoAlbums, index) in twoAlbumsList"
          :key="index"
          class="w-100 ma-0"
        >
          <v-col
            v-if="twoAlbums.length >= 1"
            cols="6"
            class="pr-1.5 pb-0"
          >
            <ClubDetailAlbumImage :album="twoAlbums[0]" />
          </v-col>
          <v-col
            v-if="twoAlbums.length >= 2"
            cols="6"
            class="pl-1.5 pb-0"
          >
            <ClubDetailAlbumImage :album="twoAlbums[1]" />
          </v-col>
        </v-row>
      </template>
      <template #empty>
        <EmptyPage
          icon="image"
          title="사진이 없습니다."
          description="사진을 올려 모임원들과 나눠보세요."
        />
      </template>
    </InfiniteScrollTemplate>
    <FixedCreateBtn
      v-if="canCreateAlbum"
      color="#E8984E"
      :size="60"
      :icon-size="40"
      @click="moveToClubAlbumCreatePage"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import ClubDetailAlbumImage from '@/views/clubDetail/components/album/ClubDetailAlbumImage.vue';
import _ from '@/utils/common/lodashWrapper.ts';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import routerHelper from '@/router/RouterHelper.ts';
import EmptyPage from '@/components/EmptyPage.vue';
import { CurrentUserInfo } from '@/interfaces/club';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import { Page } from '@/interfaces/common';
import { AlbumFeed } from '@/interfaces/album';
import { generateParamPath, PATH } from '@/router/route_path_type';

export default Vue.extend({
  name: 'ClubDetailAlbumList',
  components: {
    EmptyPage,
    InfiniteScrollTemplate,
    ClubDetailAlbumImage,
    FixedCreateBtn,
  },
  props: {
    currentUserInfo: Object as PropType<CurrentUserInfo>,
  },
  computed: {
    albumList(): AlbumFeed[] {
      return this.$store.state.album.albumList;
    },
    albumPage(): Page {
      return this.$store.state.album.albumPage;
    },
    twoAlbumsList(): AlbumFeed[][] {
      return _.chunk(this.albumList, 2);
    },
    canCreateAlbum(): boolean {
      const { isMaster, isManager } = this.currentUserInfo;
      return isMaster || isManager;
    },
  },
  methods: {
    fetchFirstPage() {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, routerHelper.clubSeq());
    },
    fetchNextPage() {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_NEXT_ALBUM_LIST, routerHelper.clubSeq())
    },
    moveToClubAlbumCreatePage() {
      this.$router.push(generateParamPath(PATH.CLUB.ALBUM_CREATE, [routerHelper.clubSeq()]));
    }
  },
});
</script>
