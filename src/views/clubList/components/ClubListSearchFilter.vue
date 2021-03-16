<template>
    <div class="search-filter-bar">
        <v-bottom-sheet v-model="sheet"
                        scrollable
        >
            <template v-slot:activator="{ on, attrs }">
                <div class="d-flex h-100 align-center">
                    <div class="d-flex ml-5">
                        <v-chip v-if="regionName"
                                close
                                color="#E8984E"
                                outlined
                                small
                                @click:close="cancelRegionSelect"
                        >
                            {{ regionName }}
                        </v-chip>
                        <ClubListSearchFilterBtn v-else
                                                 :attrs="attrs"
                                                 :on="on"
                                                 text="지역 선택"
                                                 @click="changeBottomSheetComponent('REGION')"
                        />
                    </div>
                    <div class="d-flex ml-3">
                        <v-chip v-if="interestName"
                                close
                                color="#7CBB72"
                                outlined
                                small
                                @click:close="cancelInterestSelect"
                        >
                            {{ interestName }}
                        </v-chip>
                        <ClubListSearchFilterBtn v-else
                                                 :attrs="attrs"
                                                 :on="on"
                                                 text="관심사 선택"
                                                 @click="changeBottomSheetComponent('INTEREST')"
                        />
                    </div>
                    <div class="d-flex ml-3">
                        <v-chip v-if="searchText"
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

            <BottomSheetRegionCard v-if="currentBottomSheetCard === 'REGION'"
                                   :canSelectRoot="true"
                                   @selectSubRegion="selectSearchRegion"
            />
            <BottomSheetInterestCard v-else-if="currentBottomSheetCard === 'INTEREST'"
                                     :rootInterests="rootInterests"
                                     :canSelectRoot="true"
                                     @selectSubInterest="selectSearchInterest"
            />
        </v-bottom-sheet>
    </div>
</template>

<script>
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import ClubListSearchFilterBtn from '@/views/clubList/components/ClubListSearchFilterBtn.vue';
import { PATH } from '@/router/route_path_type.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { isDarkTheme } from '@/plugins/vuetify.js';

export default {
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
        rootRegions: () => gettersHelper.rootRegions(),
        rootInterests: () => gettersHelper.rootInterests(),
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        regionName() {
            return this.clubSearchFilterInfo.region.name;
        },
        interestName() {
            return this.clubSearchFilterInfo.interest.name;
        },
        searchText() {
            return this.clubSearchFilterInfo.searchText;
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.BACK);
    },
    methods: {
        selectSearchRegion(region) {
            mutationsHelper.changeClubSearchRegion({ name: region.superRegionRoot, seq: region.seq });
            this.sheet = false;
        },
        selectSearchInterest(interest) {
            const interestDto = {
                name: interest.name,
                seq: interest.seq,
                groupSeq: interest.groupSeq,
            };
            mutationsHelper.changeClubSearchInterest(interestDto);
            this.sheet = false;
        },
        cancelRegionSelect() {
            mutationsHelper.changeClubSearchRegion(DefaultBuilder.buildClubSearchFilterInfo().region);
        },
        cancelInterestSelect() {
            mutationsHelper.changeClubSearchInterest(DefaultBuilder.buildClubSearchFilterInfo().interest);
        },
        cancelSearchTextSelect() {
            mutationsHelper.changeClubSearchText(null);
        },
        changeBottomSheetComponent(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
        },
    },
};
</script>

<style scoped
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
