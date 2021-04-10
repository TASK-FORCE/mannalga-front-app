<template>
  <div class="search-filter-bar">
    <v-bottom-sheet
      v-model="sheet"
      scrollable
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex h-100 align-center">
          <div class="d-flex ml-5">
            <v-chip
              v-if="regionName"
              close
              color="#E8984E"
              outlined
              small
              @click:close="cancelRegionSelect"
            >
              {{ regionName }}
            </v-chip>
            <ClubListSearchFilterBtn
              v-else
              :attrs="attrs"
              :on="on"
              text="지역 선택"
              @click="changeBottomSheetComponent('REGION')"
            />
          </div>
          <div class="d-flex ml-3">
            <v-chip
              v-if="interestName"
              close
              color="#7CBB72"
              outlined
              small
              @click:close="cancelInterestSelect"
            >
              {{ interestName }}
            </v-chip>
            <ClubListSearchFilterBtn
              v-else
              :attrs="attrs"
              :on="on"
              text="관심사 선택"
              @click="changeBottomSheetComponent('INTEREST')"
            />
          </div>
          <div class="d-flex ml-3">
            <v-chip
              v-if="searchText"
              close
              color="#2883C6"
              outlined
              small
              @click:close="cancelSearchTextSelect"
            >
              {{ searchText }}
            </v-chip>
          </div>
        </div>
      </template>

      <BottomSheetRegionCard
        v-if="currentBottomSheetCard === 'REGION'"
        :canSelectRoot="true"
        @selectSubRegion="selectSearchRegion"
      />
      <BottomSheetInterestCard
        v-else-if="currentBottomSheetCard === 'INTEREST'"
        :rootInterests="rootInterests"
        :canSelectRoot="true"
        @selectSubInterest="selectSearchInterest"
      />
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import ClubListSearchFilterBtn from '@/views/clubList/components/ClubListSearchFilterBtn.vue';
import { PATH } from '@/router/route_path_type.ts';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.ts';
import StateInitializer from '@/store/utils/StateInitializer.ts';
import { ClubListMutationTypes } from '@/store/type/mutationTypes.ts';
import { ClubSearchContext, InterestForSearch } from '@/interfaces/clubList';
import { Interest, InterestGroupTree, RegionTree } from '@/interfaces/common';
import routerHelper from '@/router/RouterHelper';

export default Vue.extend({
  name: 'ClubListSearchFilter',
  components: {
    BottomSheetInterestCard,
    BottomSheetRegionCard,
    ClubListSearchFilterBtn,
  },
  data() {
    return {
      sheet: false,
      seq: null,
      currentBottomSheetCard: undefined as undefined | string,
    };
  },
  computed: {
    rootRegions(): RegionTree[] {
      return this.$store.state.common.rootRegions;
    },
    rootInterests(): InterestGroupTree[] {
      return this.$store.state.common.rootInterests;
    },
    clubSearchContext(): ClubSearchContext {
      return this.$store.state.clubList.clubSearchContext;
    },
    regionName(): string {
      return this.clubSearchContext.region?.name || '';
    },
    interestName(): string {
      return this.clubSearchContext.interest?.name || '';
    },
    searchText(): string {
      return this.clubSearchContext.searchText || '';
    },
  },
  created() {
    regionAndInterestVuexService.dispatch(true)
      .catch((e) => routerHelper.pushWhenException(e, PATH.BACK));
  },
  methods: {
    selectSearchRegion(region: RegionTree) {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_REGION, {
        name: region.superRegionRoot,
        seq: region.seq,
      });
      this.sheet = false;
    },
    selectSearchInterest(interest: Interest | InterestGroupTree) {
      const interestForSearch: InterestForSearch = {
        name: interest.name,
        seq: ('seq' in interest) ? interest.seq : undefined,
        groupSeq: ('groupSeq' in interest) ? interest.groupSeq : undefined,
      };
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_INTEREST, interestForSearch);
      this.sheet = false;
    },
    cancelRegionSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_REGION, StateInitializer.clubSearchContext().region);
    },
    cancelInterestSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_INTEREST, StateInitializer.clubSearchContext().interest);
    },
    cancelSearchTextSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_TEXT, undefined);
    },
    changeBottomSheetComponent(cardComponent: string) {
      this.currentBottomSheetCard = cardComponent;
    },
  },
});

</script>

<style
  scoped
  lang="scss"
>
.search-filter-bar {
  height: 60px;
  overflow-x: scroll;
  background-color: #F5F5F5;
  position: fixed;
  z-index: 6;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.search-filter-bar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.theme--dark .search-filter-bar {
  background-color: #292929;
}
</style>
