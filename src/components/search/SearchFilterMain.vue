<template>
    <div class="text-center pt-2">
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
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
import BottomSheetRegionCard from '@/components/ui/bottom-sheet/BottomSheetRegionCard.vue';
import SearchFilterSelectBtn from '@/components/search/SearchFilterSelectBtn';
import BottomSheetInterestCard from '@/components/ui/bottom-sheet/BottomSheetInterestCard.vue';
import { PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'SearchFilterMain',
    components: {
        BottomSheetInterestCard,
        SearchFilterSelectBtn,
        BottomSheetRegionCard,
    },
    data() {
        return {
            sheet: false,
            seq: null,
            searchRegionText: '지역 선택',
            searchInterestText: '관심사 선택',
            currentBottomSheetCard: null,
        };
    },
    computed: {
        rootRegions: () => gettersHelper.rootRegions(),
        rootInterests: () => gettersHelper.rootInterests(),
        searchFilter: () => gettersHelper.searchFilter(),
    },
    created() {
        actionsFetcherService.fetchInterestAndRegionTemplate(true, PATH.LOGIN);
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
