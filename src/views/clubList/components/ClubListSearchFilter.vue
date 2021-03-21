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
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { ClubListMutationTypes } from '@/store/type/mutationTypes.ts';
import { ClubSearchContext } from '@/interfaces/clubList';
import { InterestGroupTree, RegionTree } from '@/interfaces/common';

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
      currentBottomSheetCard: null,
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
    regionName() {
      return this.clubSearchContext.region.name;
    },
    interestName() {
      return this.clubSearchContext.interest.name;
    },
    searchText() {
      return this.clubSearchContext.searchText;
    },
  },
  created() {
    regionAndInterestVuexService.dispatch(true, PATH.BACK);
  },
  methods: {
    selectSearchRegion(region) {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_REGION, {
        name: region.superRegionRoot,
        seq: region.seq,
      });
      this.sheet = false;
    },
    selectSearchInterest(interest) {
      const interestDto = {
        name: interest.name,
        seq: interest.seq,
        groupSeq: interest.groupSeq,
      };
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_INTEREST, interestDto);
      this.sheet = false;
    },
    cancelRegionSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_REGION, DefaultBuilder.clubSearchContext().region);
    },
    cancelInterestSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_INTEREST, DefaultBuilder.clubSearchContext().interest);
    },
    cancelSearchTextSelect() {
      this.$store.commit(ClubListMutationTypes.CHANGE_CLUB_SEARCH_TEXT, null);
    },
    changeBottomSheetComponent(cardComponent) {
      this.currentBottomSheetCard = cardComponent;
    },
  },
});
;</script>
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
}

.theme--dark .search-filter-bar {
  background-color: #292929;
}
</style>
