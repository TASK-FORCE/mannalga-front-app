<template>
    <div class="text-center pt-2">
        <div class="text-center">
            <v-bottom-sheet v-model="sheet"
                            scrollable
            >
                <template v-slot:activator="{ on, attrs }">
                    <div>
                        <ClubListSearchFilterBtn :attrs="attrs"
                                                 :on="on"
                                                 :text="searchRegionText"
                                                 @click="changeBottomSheetComponent('REGION')"
                        />
                        <ClubListSearchFilterBtn :attrs="attrs"
                                                 :on="on"
                                                 :text="searchInterestText"
                                                 @click="changeBottomSheetComponent('INTEREST')"
                        />
                    </div>
                    <div class="mt-2">
                        <v-chip
                            v-if="regionName"
                            close
                            color="#009688"
                            outlined
                            small
                            @click:close="cancelRegionSelect"
                        >
                            {{ regionName }}
                        </v-chip>
                        <v-chip
                            v-if="interestName"
                            class="ml-2"
                            close
                            color="#795548"
                            outlined
                            small
                            @click:close="cancelInterestSelect"
                        >
                            {{ interestName }}
                        </v-chip>
                    </div>
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
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import ClubListSearchFilterBtn from '@/views/clubList/components/club/ClubListSearchFilterBtn.vue';
import { PATH } from '@/router/route_path_type.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import regionAndInterestDispatcher from '@/store/service/RegionAndInterestDispatcher.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

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
        regionAndInterestDispatcher.dispatch(true, PATH.LOGIN);
    },
    methods: {
        selectSearchRegion(region) {
            mutationsHelper.changeClubSearchRegion({ name: region.superRegionRoot, seq: region.seq });
            this.sheet = false;
        },
        selectSearchInterest(interest) {
            mutationsHelper.changeClubSearchInterest({ name: interest.name, seq: interest.seq });
            this.sheet = false;
        },
        cancelRegionSelect() {
            mutationsHelper.changeClubSearchRegion(defaultBuilder.buildClubSearchFilterInfo().region);
        },
        cancelInterestSelect() {
            mutationsHelper.changeClubSearchInterest(defaultBuilder.buildClubSearchFilterInfo().interest);
        },
        changeBottomSheetComponent(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
        },
    },
};
</script>
