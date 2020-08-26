<template>
    <div v-show="!isLoading"
         class="mx-3"
    >
        <div class="text-center">
            관심사를 선택 해주세요. <br>
            (원하는 관심사는 최대 5개까지 가능합니다)
        </div>
        <div v-for="interest in interests"
             :key="interest.groupSeq"
             class="mt-3"
        >
            <v-icon>mdi-music-circle-outline</v-icon>
            {{ interest.name }}
            <br>
            <v-btn v-for="{seq, name} in interest.interestList"
                   :key="seq"
                   outlined
                   :class="isInclude(seq)"
                   class="ma-1"
                   small
                   @click="toggleInterest(seq)"
            >
                {{ name }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import { INTERESTS, REQUEST_INTEREST_TEMPLATE, TEMPLATE } from '@/store/type/template_type.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import _ from '@/utils/lodashWrapper.js';
import { COMMON, IS_LOADING, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import {
    ADD_SELECTED_INTEREST_SEQS,
    REMOVE_SELECTED_INTEREST_SEQS,
    SELECTED_INTEREST_SEQS,
    USER,
} from '@/store/type/user_type.js';

const MAXIMUM_SELECTABLE_COUNT = 5;

export default {
    name: 'UserInterest',
    computed: {
        ...mapGetters(TEMPLATE, { interests: INTERESTS }),
        ...mapGetters(USER, { selectedInterestSeqs: SELECTED_INTEREST_SEQS }),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
    },
    created() {
        if (_.isEmpty(this[INTERESTS])) {
            this[REQUEST_INTEREST_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_INTEREST_TEMPLATE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        ...mapMutations(USER, [ADD_SELECTED_INTEREST_SEQS, REMOVE_SELECTED_INTEREST_SEQS]),
        toggleInterest(targetSeq) {
            const toBeDeletedIndex = _.findIndex(this[SELECTED_INTEREST_SEQS], seq => seq === targetSeq);
            if (toBeDeletedIndex >= 0) {
                this[REMOVE_SELECTED_INTEREST_SEQS](toBeDeletedIndex);
                return;
            }

            if (this[SELECTED_INTEREST_SEQS].length >= MAXIMUM_SELECTABLE_COUNT) {
                this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SELECT_INTEREST_OVER_COUNT));
                return;
            }

            this[ADD_SELECTED_INTEREST_SEQS](targetSeq);
        },
        isInclude(seq) {
            const include = this[SELECTED_INTEREST_SEQS].includes(seq);
            return include ? 'active' : '';
        },
    },
};
</script>

<style scoped>
.active {
    background-color: green;
    color: white;
}
</style>
