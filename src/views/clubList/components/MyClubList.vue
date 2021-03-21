<template>
  <InfiniteScrollTemplate
    name="myClub"
    :firstPageCallback="this.fetchFirstPage"
    :nextPageCallback="this.fetchNextPage"
    :pageElements="myClubList"
    :pageInfo="myClubPage"
  >
    <template v-slot:list-main>
      <div
        v-for="{seq, club, roles} in myClubList"
        :key="seq"
      >
        <ClubPost
          :club="club"
          :role="roles[0].name"
          myPost
        />
      </div>
    </template>
    <template #empty>
      <EmptyPage
        icon="supervisor"
        title="모임이 없습니다."
        description="원하는 모임을 직접 만들어 운영해보세요."
      />
    </template>
  </InfiniteScrollTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { MyClubFeed } from '@/interfaces/clubList';
import { Page } from '@/interfaces/common';
import { ClubListActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
  name: 'MyClubList',
  components: { EmptyPage, InfiniteScrollTemplate, ClubPost },
  data() {
    return {
      sentinel: null,
      listGroup: null,
      isRequesting: false,
    };
  },
  computed: {
    myClubList(): MyClubFeed[] {
      return this.$store.state.clubList.myClubList;
    },
    myClubPage(): Page {
      return this.$store.state.clubList.myClubPage;
    },
  },
  methods: {
    fetchFirstPage() {
      return this.$store.dispatch(ClubListActionTypes.REQUEST_FIRST_MY_CLUB_LIST, false);
    },
    fetchNextPage() {
      return this.$store.dispatch(ClubListActionTypes.REQUEST_NEXT_MY_CLUB_LIST);
    },
  },
});
</script>
