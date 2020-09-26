<template>
    <div class="text-center mt-2">
        <div class="text-center">
            <v-bottom-sheet v-model="sheet"
                            scrollable
            >
                <template v-slot:activator="{ on, attrs }">
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchLocationText"
                                           @click="changeBottomSheetComponent('LOCATION')"
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

                <BottomSheetLocationCard v-if="currentBottomSheetCard === 'LOCATION'"
                                         :rootStates="rootStates"
                                         :canSelectRoot="true"
                                         @selectSubState="selectSearchLocation"
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
import BottomSheetLocationCard from '@/components/bottom-sheet/BottomSheetLocationCard.vue';
import SearchFilterSelectBtn from '@/components/search/SearchFilterSelectBtn';
import BottomSheetSortCard from '@/components/bottom-sheet/BottomSheetSortCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import { LOGIN_PATH } from '@/router/route_path_type.js';
import { getterHelper } from '@/store/helper/getterHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'SearchFilterMain',
    components: {
        BottomSheetInterestCard,
        BottomSheetSortCard,
        SearchFilterSelectBtn,
        BottomSheetLocationCard,
    },
    data() {
        return {
            sheet: false,
            seq: null,
            searchLocationText: '지역 선택',
            searchInterestText: '관심사 선택',
            searchSortText: '정렬',
            currentBottomSheetCard: null,
        };
    },
    computed: {
        rootStates: () => getterHelper.rootLocations(),
        rootInterests: () => getterHelper.rootInterests(),
        searchFilter: () => getterHelper.searchFilter(),
    },
    created() {
        actionsFetcherService.fetchInterestAndLocationTemplate(true,
            () => this.$router.push(LOGIN_PATH));
    },
    methods: {
        selectSearchLocation(location) {
            const locationFilter = {
                seq: location.seq,
                priority: 1,
            };
            mutationsHelper.changeLocationSearchFilter(locationFilter);
            this.changedSearchFilter();
            this.searchLocationText = location.name;
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
