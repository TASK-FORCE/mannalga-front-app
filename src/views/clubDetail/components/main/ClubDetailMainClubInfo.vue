<template>
    <div>
        <v-img src="https://picsum.photos/510/300?random"
               aspect-ratio="2"
        />
        <v-list-item>
            <v-list-item-content>
                <v-row>
                    <v-col cols="6"
                           class="py-0"
                    >
                        <div class="text-center">
                            <v-btn fab
                                   width="24"
                                   height="24"
                                   outlined
                            >
                                <v-icon style="font-size: 19px">mdi-map-marker-outline</v-icon>
                            </v-btn>
                            <div class="title">강동구, 강서구</div>
                        </div>
                    </v-col>
                    <v-col cols="6"
                           class="py-0"
                    >
                        <div class="text-center">
                            <InterestIcons :interestWithPriority="clubInfo.clubInterest" />
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
        <div>
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
    props: ['clubInfo'],
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
                .then(mutationsHelper.openSnackBar('클럽 가입 성공'))
                .catch(mutationsHelper.openSnackBar('클럽 가입 실패'));
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
</style>
