<template>
    <div>
        <CommonImageSelectBox text="모임 대표 사진 등록"
                              @changeImageUrl="value => clubCreateBoxInfo.imageUrl = value"
        />
        <v-bottom-sheet v-model="sheet"
                        scrollable
        >
            <template v-slot:activator="{}">
                <ClubCreateForm ref="clubCreateForm"
                                :clubCreateBoxInfo="clubCreateBoxInfo"
                                @openBottomSheetCard="openBottomSheetCard"
                                @inputTitle="value => clubCreateBoxInfo.title = value"
                                @inputDescription="value => clubCreateBoxInfo.description = value"
                                @selectMaximumNumber="value => clubCreateBoxInfo.maximumNumber = value"
                />
            </template>
            <BottomSheetInterestCard v-if="currentBottomSheetCard === 'INTEREST'"
                                     :rootInterests="interests"
                                     @selectSubInterest="selectClubInterest"
            />
            <BottomSheetLocationCard v-else-if="currentBottomSheetCard === 'LOCATION'"
                                     :rootStates="rootStates"
                                     @selectSubState="selectClubLocation"
            />
        </v-bottom-sheet>
        <CommonCenterBtn text="모임 만들기"
                         color="primary"
                         :outlined="true"
                         @click="createClub"
        />
    </div>
</template>

<script>

import CommonCenterBtn from '@/components/common/CommonCenterBtn.vue';
import CommonImageSelectBox from '@/components/common/CommonImageSelectBox.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import BottomSheetLocationCard from '@/components/bottom-sheet/BottomSheetLocationCard.vue';
import { MESSAGE } from '@/utils/constant/constant.js';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {
    INTERESTS,
    REQUEST_INTEREST_TEMPLATE,
    REQUEST_STATE_TEMPLATE,
    ROOT_STATES,
    TEMPLATE,
} from '@/store/type/template_type.js';
import _ from '@/utils/lodashWrapper.js';
import { MAIN_PATH } from '@/router/route_path_type.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import ClubCreateForm from '@/components/club/create/ClubCreateForm.vue';
import { CLUB, REQUEST_CLUB_CREATE } from '@/store/type/club_type.js';
import { clubBuilder } from '@/utils/builder/builder.js';

export default {
    name: 'ClubCreateBox',
    components: {
        ClubCreateForm,
        CommonImageSelectBox,
        CommonCenterBtn,
        BottomSheetInterestCard,
        BottomSheetLocationCard,
    },
    data() {
        return {
            sheet: false,
            currentBottomSheetCard: '',
            clubCreateBoxInfo: {
                title: null,
                description: null,
                maximumNumber: 30,
                imageUrl: null,
                interest: null,
                location: null,
            },
        };
    },
    computed: {
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES, interests: INTERESTS }),
        clubCreateInterest() {
            return this.clubCreateBoxInfo.interest;
        },
        clubCreateLocation() {
            return this.clubCreateBoxInfo.location;
        },
    },
    created() {
        if (_.isEmpty(this[ROOT_STATES])) {
            this[REQUEST_STATE_TEMPLATE]()
                .catch(() => this.$router.push(MAIN_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }

        if (_.isEmpty(this[INTERESTS])) {
            this[REQUEST_INTEREST_TEMPLATE]()
                .catch(() => this.$router.push(MAIN_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE, REQUEST_INTEREST_TEMPLATE]),
        ...mapActions(CLUB, [REQUEST_CLUB_CREATE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        openBottomSheetCard(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
            this.sheet = true;
        },
        selectClubInterest(interest) {
            this.sheet = false;
            this.clubCreateBoxInfo.interest = interest;
        },
        selectClubLocation(location) {
            this.sheet = false;
            this.clubCreateBoxInfo.location = location;
        },
        createClub() {
            if (this.$refs.clubCreateForm.validate()) {
                this[REQUEST_CLUB_CREATE](clubBuilder.buildClubCreateDto(this.clubCreateBoxInfo))
                    .then(() => this.$router.push(MAIN_PATH)
                        .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SUCCESS_CLUB_CREATE))))
                    .catch(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.FAIL_CLUB_CREATE)));
            }
        },
    },
};
</script>

<style scoped>

</style>
