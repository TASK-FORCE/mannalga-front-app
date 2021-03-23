<template>
  <v-app-bar
    class="elevation-0"
    app
  >
    <v-text-field
      v-model="searchText"
      class="club-search-bar"
      placeholder="모임을 검색하세요."
      prepend-icon="$search"
    />
    <v-spacer />
    <UserSettingPageEnterAvatar />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { PATH } from '@/router/route_path_type.ts';
import _ from '@/utils/common/lodashWrapper.ts';
import UserSettingPageEnterAvatar from '@/components/UserSettingPageEnterAvatar.vue';
import { ClubListMutationTypes, ClubMutationTypes, UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { ClubSearchContext } from '@/interfaces/clubList';

const SEARCH_WAIT_TIME = 500;

export default Vue.extend({
  name: 'ClubListPageHeader',
  components: { UserSettingPageEnterAvatar },
  data() {
    return {
      clubSearchPagePath: PATH.CLUB.SEARCH,
      searchText: '' as string,
      searchCallback: () => ({}) as () => void,
    };
  },
  computed: {
    clubSearchContext(): ClubSearchContext {
      return this.$store.state.clubList.clubSearchContext;
    },
  },
  watch: {
    searchText(value) {
      if (_.isEmpty(value)) {
        return;
      }
      this.$store.commit(ClubMutationTypes.SET_CURRENT_TAB, 'club');
      this.$store.commit(UIMutationTypes.CHANGE_LOADING, true);
      this.searchCallback();
    },
    clubSearchContext() {
      this.searchText = this.clubSearchContext.searchText;
    },
  },
  mounted() {
    this.searchCallback = _.debounce(() => this.search(this.searchText), SEARCH_WAIT_TIME);
    if (process.env.NODE_ENV !== 'production') {
      this.searchText = '';
    }
  },
  methods: {
    search(searchText: string): void {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_TEXT, searchText);
    },
  },
});
</script>
<style
  lang="scss"
  scoped
>
.v-toolbar__content {
  padding: 0 !important;
}
</style>
