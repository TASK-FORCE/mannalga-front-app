<template>
    <div class="text-center pt-2">
        <div class="text-center">
            <v-bottom-sheet v-model="sheet"
                            scrollable
            >
                <template v-slot:activator="{ on, attrs }">
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="regionName || searchRegionText"
                                           @click="changeBottomSheetComponent('REGION')"
                    />
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="interestName || searchInterestText"
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
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

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
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        regionName() {
            return this.clubSearchFilterInfo.region.name;
        },
        interestName() {
            return this.clubSearchFilterInfo.interest.name;
        },
    },
    created() {
        actionsFetcherService.fetchInterestAndRegionTemplate(true, PATH.LOGIN);
    },
    methods: {
        selectSearchRegion(region) {
            const newClubSearchFilterInfo = {
                region: { name: region.name, seq: region.seq },
                interest: this.clubSearchFilterInfo.interest,
            };
            this.change(newClubSearchFilterInfo);
        },
        selectSearchInterest(interest) {
            const newClubSearchFilterInfo = {
                region: this.clubSearchFilterInfo.region,
                interest: { name: interest.name, seq: interest.seq },
            };
            this.change(newClubSearchFilterInfo);
        },
        change(newClubSearchFilterInfo) {
            mutationsHelper.changeClubSearchFilterInfo(newClubSearchFilterInfo);
            this.$emit('changeSearchFilter');
            this.sheet = false;
        },
        changeBottomSheetComponent(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
        },
    },
};
</script>

<style scoped>

</style>
