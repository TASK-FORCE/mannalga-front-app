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
                                             @selectSubState="selectSearchLocation"
                />
                <BottomSheetInterestCard v-else-if="currentBottomSheetCard === 'INTEREST'"
                                             :rootInterests="interests"
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
import { mapActions, mapGetters } from 'vuex';
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
import BottomSheetSortCard from '@/components/bottom-sheet/BottomSheetSortCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';

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
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES, interests: INTERESTS }),
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
        selectSearchLocation(location) {
            // location.seq로 검색
            this.searchLocationText = location.name;
            this.sheet = false;
        },
        selectSearchInterest(interest) {
            // interest.seq로 검색
            this.searchInterestText = interest.name;
            this.sheet = false;
        },
        selectSearchSort(sort) {
            // sort로 검색
            this.searchSortText = sort.name;
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
