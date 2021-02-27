<template>
    <div>
        <v-img :src="clubInfo.mainImageUrl || require('@/images/default_club_image.png')"
               aspect-ratio="2"
        />
        <div class="club-name">
            {{ clubInfo.name }}
        </div>
        <div class="club-interest-region-wrapper">
            <div class="d-flex align-center">
                <v-icon size="17"
                        v-text="'$mapMarker'"
                />
                <span class="region-text">{{ clubRegionsText }}</span>
            </div>
            <div class="d-flex align-center mt-2">
                <WindMill />
                <span class="interest-text">{{ clubInterestsText }}</span>
            </div>
        </div>
        <MiddleDivider class="mt-5"
                       :height="1"
        />
        <div class="description-wrapper">
            <div class="description"
                 v-html="description"
            />
        </div>
        <div v-if="needToShowRegisterBtn">
            <CommonCenterBtn id="registerBtn"
                             text="가입하기"
                             outlined
                             @click="showRegisterDialog = true"
            />
            <FixedTextBtnShowByHeight text="가입"
                                      :heightBoundaryToShow="heightBoundaryToShowRegisterBtn"
                                      @click="showRegisterDialog = true"
            />
        </div>
        <YesOrNoDialog v-model="showRegisterDialog"
                       title="모임에 가입하시겠습니까?"
                       :submitPromiseCallback="requestClubRegister"
        >
            <template #description>
                <div class="ml-2">
                    확인 시 즉시 모임에 가입됩니다.
                </div>
            </template>
        </YesOrNoDialog>
        <SnackBar :open="imageChangeSnackBarOpen"
                  :snackBarOptions="imageChangeSnackBarOptions"
                  btnText="추가"
                  @click="$refs.imageSelector.trigger()"
        />
        <ImageSelectorWithConfirm ref="imageSelector"
                                  :imageChangeCallback="changeClubMainImage"
        >
            <template #image="{ imageUrl }">
                <v-img :src="imageUrl" />
            </template>
        </ImageSelectorWithConfirm>
    </div>
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import FixedTextBtnShowByHeight from '@/components/button/FixedTextBtnShowByHeight.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import ImageSelectorWithConfirm from '@/components/image/ImageSelectorWithConfirm.vue';
import { SNACKBAR_LOCATION, SnackBarOption } from '@/utils/common/snackbarUtils.js';
import SnackBar from '@/components/SnackBar.vue';
import WindMill from '@/components/icons/WindMill.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';

const CHANGE_IMAGE_COOL_TIME_MINUTE = 6 * 60;
const toMillisecond = (minute) => minute * 60 * 1000;
const checkCoolTime = (clubSeq) => {
    const key = 'clubImageChangeSnackbarCoolTime';
    const timer = JSON.parse(localStorage.getItem(key)) || {};
    const time = timer[clubSeq];
    if (!time || time <= Date.now()) {
        timer[clubSeq] = Date.now() + toMillisecond(CHANGE_IMAGE_COOL_TIME_MINUTE);
        localStorage.setItem(key, JSON.stringify(timer));
        return true;
    }
    return false;
};

export default {
    name: 'ClubDetailMainClubInfo',
    components: {
        MiddleDivider,
        WindMill,
        SnackBar,
        ImageSelectorWithConfirm,
        YesOrNoDialog,
        FixedTextBtnShowByHeight,
        CommonCenterBtn,
    },
    props: {
        clubInfo: {
            type: Object,
            required: true,
        },
        currentUserInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            heightBoundaryToShowRegisterBtn: 500,
            showRegisterDialog: false,
            imageChangeSnackBarOpen: false,
            imageChangeSnackBarOptions: new SnackBarOption('모임 대표 사진을 추가해보세요!', SNACKBAR_LOCATION.BOTTOM, 'blue', 5000),
        };
    },
    computed: {
        description() {
            return this.clubInfo.description.replaceAll('\n', '<br />');
        },
        clubInterestsText() {
            return _.sortBy(this.clubInfo.clubInterest, ({ priority }) => priority)
                .map(({ interest }) => interest.name)
                .join(', ');
        },
        clubRegionsText() {
            return _.sortBy(this.clubInfo.clubRegion, ({ priority }) => priority)
                .map(({ region }) => region.superRegionRoot)
                .join(', ');
        },
        needToShowRegisterBtn() {
            const { isMaster, isManager, isMember } = this.currentUserInfo;
            return !(isMaster || isManager || isMember);
        },
    },
    mounted() {
        if (this.needToShowRegisterBtn) {
            const registerBtn = document.getElementById('registerBtn');
            this.heightBoundaryToShowRegisterBtn = registerBtn.offsetTop + (registerBtn.offsetHeight / 2);
        }
        if (!this.clubInfo.mainImageUrl && this.currentUserInfo.isMaster && checkCoolTime(this.clubInfo.seq)) {
            this.imageChangeSnackBarOpen = true;
        }
    },
    methods: {
        requestClubRegister() {
            const { clubSeq } = this.$route.params;
            return actionsHelper.requestClubJoin(clubSeq)
                .then(() => {
                    mutationsHelper.openSnackBar('모임 가입 성공');
                    this.showRegisterDialog = false;
                });
        },
        changeClubMainImage({ absolutePath }) {
            const clubChangeRequestDto = {
                name: this.clubInfo.name,
                description: this.clubInfo.description,
                maximumNumber: this.clubInfo.maximumNumber,
                mainImageUrl: absolutePath,
                interestList: this.clubInfo.clubInterest.map(({ interest, priority }) => ({
                    seq: interest.seq,
                    priority,
                })),
                regionList: this.clubInfo.clubRegion.map(({ region, priority }) => ({ seq: region.seq, priority })),
            };
            return actionsHelper.requestClubChange({
                clubSeq: this.clubInfo.seq,
                clubChangeRequestDto,
            });
        },
    },
};
</script>

<style scoped
       lang="scss"
>

.club-name {
    font-size: 22px;
    font-weight: bold;
    margin-top: 15px;
    padding: 0 20px;
    color: #292929;
}

.club-interest-region-wrapper {
    padding: 0 20px;
    margin-top: 15px;

    .interest-text, .region-text {
        margin-left: 6px;
        font-size: .8rem;
        color: #292929;
    }
}

.description-wrapper {

    padding: 20px 15px;

    .description {
        font-size: 15px;
        color: #292929;
    }
}

.theme--dark {
    .club-name, .interest-text, .region-text, .description {
        color: #F5F5F5;
    }
}
</style>
