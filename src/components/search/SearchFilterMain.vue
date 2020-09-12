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
                                           @click="changeSearchCardComponent('LOCATION')"
                    />
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchSortText"
                                           @click="changeSearchCardComponent('SORT')"
                    />
                    <SearchFilterSelectBtn :attrs="attrs"
                                           :on="on"
                                           :text="searchInterestText"
                                           @click="changeSearchCardComponent('INTEREST')"
                    />
                </template>

                <SearchFilterLocationCard v-if="currentSearchCard === 'LOCATION'"
                                          :rootStates="rootStates"
                                          @selectSearchLocation="selectSearchLocation"
                />
                <SearchFilterInterestCard v-else-if="currentSearchCard === 'INTEREST'"
                                          :rootInterests="interests"
                                          @selectSearchInterest="selectSearchInterest"
                />
                <SearchFilterSortCard v-else-if="currentSearchCard === 'SORT'"
                                      @selectSearchSort="selectSearchSort"
                />
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
import SearchFilterLocationCard from '@/components/search/SearchFilterLocationCard.vue';
import SearchFilterSelectBtn from '@/components/search/SearchFilterSelectBtn';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import {
    INTERESTS,
    REQUEST_INTEREST_TEMPLATE,
    REQUEST_STATE_TEMPLATE,
    ROOT_STATES,
    TEMPLATE,
} from '@/store/type/template_type.js';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';
import _ from '@/utils/lodashWrapper.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import SearchFilterSortCard from '@/components/search/SearchFilterSortCard.vue';
import SearchFilterInterestCard from '@/components/search/SearchFilterInterestCard.vue';
import {
    CHANGE_INTEREST_SEARCH_FILTER,
    CHANGE_LOCATION_SEARCH_FILTER,
    CLUB_LIST_MODULE, SEARCH_FILTER,
} from '@/store/type/club_list_type.js';

export default {
    name: 'SearchFilterMain',
    components: {
        SearchFilterInterestCard,
        SearchFilterSortCard,
        SearchFilterSelectBtn,
        SearchFilterLocationCard,
    },
    data() {
        return {
            sheet: false,
            seq: null,
            searchLocationText: '지역 선택',
            searchInterestText: '관심사 선택',
            searchSortText: '정렬',
            currentSearchCard: null,
        };
    },
    computed: {
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES, interests: INTERESTS }),
        ...mapGetters(CLUB_LIST_MODULE, { searchFilter: SEARCH_FILTER }),
    },
    created() {
        if (_.isEmpty(this[ROOT_STATES])) {
            this[REQUEST_STATE_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }

        if (_.isEmpty(this[INTERESTS])) {
            this[REQUEST_INTEREST_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE, REQUEST_INTEREST_TEMPLATE]),
        ...mapMutations(CLUB_LIST_MODULE, [CHANGE_LOCATION_SEARCH_FILTER, CHANGE_INTEREST_SEARCH_FILTER]),
        selectSearchLocation(location) {
            const locationFilter = {
                seq: location.seq,
                priority: 1,
            };
            this[CHANGE_LOCATION_SEARCH_FILTER](locationFilter);
            this.changedSearchFilter();
            this.searchLocationText = location.name;
            this.sheet = false;
        },
        selectSearchInterest(interest) {
            const interestFilter = {
                seq: interest.seq,
                priority: 1,
            };
            this[CHANGE_INTEREST_SEARCH_FILTER](interestFilter);
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
        changeSearchCardComponent(cardComponent) {
            this.currentSearchCard = cardComponent;
        },
        changedSearchFilter() {
            this.$emit('changedSearchFilter');
        },
    },
};
</script>

<style scoped>

</style>
