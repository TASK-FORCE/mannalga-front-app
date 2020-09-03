<template>
    <div class="text-center mt-2">
        <div class="text-center">
            <v-bottom-sheet v-model="sheet"
                            scrollable
            >
                <template v-slot:activator="{ on, attrs }">
                    <SearchConditionSelectBtn :attrs="attrs"
                                              :on="on"
                                              :text="searchLocationText"
                                              @click="changeSearchCardComponent('LOCATION')"
                    />
                    <SearchConditionSelectBtn :attrs="attrs"
                                              :on="on"
                                              :text="searchSortText"
                                              @click="changeSearchCardComponent('SORT')"
                    />
                    <SearchConditionSelectBtn :attrs="attrs"
                                              :on="on"
                                              :text="searchInterestText"
                                              @click="changeSearchCardComponent('INTEREST')"
                    />
                </template>

                <SearchConditionLocationCard v-if="currentSearchCard === 'LOCATION'"
                                             :rootStates="rootStates"
                                             @selectSearchLocation="selectSearchLocation"
                />
                <SearchConditionInterestCard v-else-if="currentSearchCard === 'INTEREST'"
                                             :rootInterests="interests"
                                             @selectSearchInterest="selectSearchInterest"
                />
                <SearchConditionSortCard v-else-if="currentSearchCard === 'SORT'"
                                         @selectSearchSort="selectSearchSort"
                />
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
import SearchConditionLocationCard from '@/components/search/SearchConditionLocationCard.vue';
import SearchConditionSelectBtn from '@/components/search/SearchConditionSelectBtn.vue';
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
import SearchConditionInterestCard from '@/components/search/SearchConditionInterestCard.vue';
import SearchConditionSortCard from '@/components/search/SearchConditionSortCard.vue';

export default {
    name: 'SearchConditionMain',
    components: {
        SearchConditionSortCard,
        SearchConditionInterestCard,
        SearchConditionSelectBtn,
        SearchConditionLocationCard,
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
        changeSearchCardComponent(cardComponent) {
            this.currentSearchCard = cardComponent;
        },
    },
};
</script>

<style scoped>

</style>
