<template>
    <div>
        <div v-if="clubInfo.mainImageUrl !== ''">
            <v-img :src="clubInfo.mainImageUrl"
                   aspect-ratio="2"
            />
        </div>
        <!--    TODO 사진이 없다면 사진 등록 권고(MASTER role에게만)    -->
        <v-list-item>
            <v-list-item-content>
                <v-row>
                    <v-col cols="6"
                           class="py-0"
                    >
                        <div class="text-center">
                            <v-btn fab
                                   height="20"
                                   width="20"
                                   outlined
                            >
                                <v-icon class="region-icon">mdi-map-marker-outline</v-icon>
                            </v-btn>
                            <div class="title">{{ clubRegionsText }}</div>
                        </div>
                    </v-col>
                    <v-col cols="6"
                           class="py-0"
                    >
                        <div class="text-center">
                            <InterestIcons :interestListWithPriority="clubInfo.clubInterest" />
                            <div class="title">{{ clubInterestsText }}</div>
                        </div>
                    </v-col>
                </v-row>
                <div class="mb-2 club-name">
                    {{ clubInfo.name }}
                </div>
                <v-list-item-subtitle v-html="description" />
            </v-list-item-content>
        </v-list-item>
        <div v-if="!userInfo.isMember">
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
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import InterestIcons from '@/components/interest/InterestIcons.vue';
import FixedTextBtnShowByHeight from '@/components/button/FixedTextBtnShowByHeight.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

export default {
    name: 'ClubDetailMainClubInfo',
    components: { FixedTextBtnShowByHeight, InterestIcons, CommonCenterBtn },
    props: {
        clubInfo: {
            type: Object,
            required: true,
        },
        userInfo: {
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
            const clubRegionNames = this.clubInfo.clubRegion.map(({ name }) => name);
            return clubRegionNames.join(', ');
        },
    },
    mounted() {
        const registerBtn = document.getElementById('registerBtn');
        // 스크롤이 registerBtn을 50%이상 가리게 되면 fixedRegistBtn을 보여주도록 한다.
        this.heightBoundaryToShowRegistBtn = registerBtn.offsetTop + (registerBtn.offsetHeight / 2);
    },
    methods: {
        requestClubRegist() {
            const { clubSeq } = this.$route.params;
            // TODO 서버 측 에러 수정 필요
            actionsHelper.requestClubJoin(clubSeq)
                .then(() => mutationsHelper.openSnackBar('모임 가입 성공'))
                .catch(() => mutationsHelper.openSnackBar('모임 가입 실패'));
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
