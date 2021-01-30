<template>
    <div>
        <div v-if="clubInfo.mainImageUrl !== ''">
            <!--    TODO 사진이 없다면 사진 등록 권고(MASTER role에게만)    -->
            <v-img :src="clubInfo.mainImageUrl"
                   aspect-ratio="2"
            />
        </div>
        <div class="pa-3">
            <div class="d-flex">
                <div class="flex-grow-1">
                    <div class="text-center">
                        <v-btn fab
                               height="20"
                               width="20"
                               outlined
                        >
                            <v-icon class="region-icon"
                                    v-text="'$mapMarker'"
                            />
                        </v-btn>
                        <div class="title">{{ clubRegionsText }}</div>
                    </div>
                </div>
                <div class="flex-grow-1">
                    <div class="text-center">
                        <InterestIcons :interestListWithPriority="clubInfo.clubInterest" />
                        <div class="title">{{ clubInterestsText }}</div>
                    </div>
                </div>
            </div>
            <div class="mb-2 club-name">
                {{ clubInfo.name }}
            </div>
            <v-list-item-subtitle v-html="description" />
            <div v-if="needToShowRegisterBtn">
                <CommonCenterBtn id="registerBtn"
                                 text="가입하기"
                                 outlined
                                 @click="requestClubRegist"
                />
                <FixedTextBtnShowByHeight text="가입"
                                          :heightBoundaryToShow="heightBoundaryToShowRegistBtn"
                                          @click="requestClubRegist"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import InterestIcons from '@/components/interest/InterestIcons.vue';
import FixedTextBtnShowByHeight from '@/components/button/FixedTextBtnShowByHeight.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'ClubDetailMainClubInfo',
    components: { FixedTextBtnShowByHeight, InterestIcons, CommonCenterBtn },
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
            heightBoundaryToShowRegistBtn: 500,
        };
    },
    computed: {
        description() {
            return this.clubInfo.description.replaceAll('\n', '<br />');
        },
        clubInterestsText() {
            const interestNames = this.clubInfo.clubInterest.map(({ interest }) => interest).map(({ name }) => name);
            return interestNames.join(', ');
        },
        clubRegionsText() {
            const clubRegionNames = _.sortBy(this.clubInfo.clubRegion, ({ priority }) => priority)
                .map(({ region }) => region.name);
            return clubRegionNames.join(', ');
        },
        needToShowRegisterBtn() {
            const { isMaster, isManager, isMember } = this.currentUserInfo;
            return !(isMaster || isManager || isMember);
        },
    },
    mounted() {
        if (this.needToShowRegisterBtn) {
            const registerBtn = document.getElementById('registerBtn');
            this.heightBoundaryToShowRegistBtn = registerBtn.offsetTop + (registerBtn.offsetHeight / 2);
        }
    },
    methods: {
        requestClubRegist() {
            const { clubSeq } = this.$route.params;
            actionsHelper.requestClubJoin(clubSeq)
                .then(() => mutationsHelper.openSnackBar('모임 가입 성공'));
        },
    },
};
</script>

<style scoped>
.club-name {
    font-size: 1.4rem;
    font-weight: bold;
}

.title {
    font-size: 0.8rem !important;
}

.region-icon {
    width: 14px !important;
    height: 14px !important;
    font-size: 14px !important;
}
</style>
