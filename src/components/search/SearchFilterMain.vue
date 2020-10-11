<template>
    <div class="text-center mt-2">
        <div class="text-center">
            <v-bottom-sheet v-model="sheet"
                            scrollable
            >
                <template v-slot:activator="{ on, attrs }">
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchRegionText"
                                           @click="changeBottomSheetComponent('REGION')"
                    />
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchSortText"
                                           @click="changeBottomSheetComponent('SORT')"
                    />
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchInterestText"
                                           @click="changeBottomSheetComponent('INTEREST')"
                    />
                </template>

                <BottomSheetRegionCard v-if="currentBottomSheetCard === 'REGION'"
                                       :rootRegions="rootRegions"
                                       :canSelectRoot="true"
                                       @selectSubRegion="selectSearchRegion"
                />
                <BottomSheetInterestCard v-else-if="currentBottomSheetCard === 'INTEREST'"
                                         :rootInterests="rootInterests"
                                         :canSelectRoot="true"
                                         @selectSubInterest="selectSearchInterest"
                />
                <BottomSheetSortCard v-else-if="currentBottomSheetCard === 'SORT'"
                                     @selectSortOption="selectSearchSort"
                />
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import SearchFilterSelectBtn from '@/components/search/SearchFilterSelectBtn';
import BottomSheetSortCard from '@/components/bottom-sheet/BottomSheetSortCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import { LOGIN_PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'SearchFilterMain',
    components: {
        BottomSheetInterestCard,
        BottomSheetSortCard,
        SearchFilterSelectBtn,
        BottomSheetRegionCard,
    },
    data() {
        return {
            sheet: false,
            seq: null,
            searchRegionText: '지역 선택',
            searchInterestText: '관심사 선택',
            searchSortText: '정렬',
            currentBottomSheetCard: null,
        };
    },
    computed: {
        rootRegions: () => gettersHelper.rootRegions(),
        rootInterests: () => gettersHelper.rootInterests(),
        searchFilter: () => gettersHelper.searchFilter(),
    },
    created() {
        actionsFetcherService.fetchInterestAndRegionTemplate(true, LOGIN_PATH);
    },
    methods: {
        selectSearchRegion(region) {
            const regionFilter = {
                seq: region.seq,
                priority: 1,
            };
            mutationsHelper.changeRegionSearchFilter(regionFilter);
            this.changedSearchFilter();
            this.searchRegionText = region.name;
            this.sheet = false;
        },
        selectSearchInterest(interest) {
            const interestFilter = {
                seq: interest.seq,
                priority: 1,
            };
            mutationsHelper.changeInterestSearchFilter(interestFilter);
            this.changedSearchFilter();
            this.searchInterestText = interest.name;
            this.sheet = false;
        },
        selectSearchSort(sort) {
            // sort로 검색
            this.searchSortText = sort.name;
            this.changedSearchFilter();
            this.sheet = false;
        },
        changeBottomSheetComponent(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
        },
        changedSearchFilter() {
            this.$emit('changedSearchFilter');
        },
    },
};
</script>

<style scoped>

</style>
