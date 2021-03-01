<template>
    <div>
        <ClubDetailMainClubInfo :clubInfo="clubInfo"
                                :currentUserInfo="currentUserInfo"
        />
        <MiddleDivider :height="5" />
        <ClubDetailMainMember :clubInfo="clubInfo"
                              :clubUserList="clubUserList"
                              :currentUserInfo="currentUserInfo"
        />
        <div v-if="meetingBtnContext">
            <MiddleDivider :height="1" />
            <div class="pa-3">
                <v-btn width="100%"
                       color="#2883c6"
                       height="60"
                       class="meeting-btn"
                       @click="meetingBtnContext.click"
                >
                    {{ meetingBtnContext.text }}
                </v-btn>
            </div>
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
    </div>
</template>

<script>
import ClubDetailMainClubInfo from '@/views/clubDetail/components/main/ClubDetailMainClubInfo.vue';
import ClubDetailMainMember from '@/views/clubDetail/components/main/ClubDetailMainMember.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubDetailMain',
    components: { YesOrNoDialog, MiddleDivider, ClubDetailMainClubInfo, ClubDetailMainMember },
    props: {
        clubInfo: Object,
        currentUserInfo: Object,
        clubUserList: Array,
    },
    data() {
        return {
            showRegisterDialog: false,
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        isNotMember() {
            const { isMaster, isManager, isMember } = this.currentUserInfo;
            return !(isMaster || isManager || isMember);
        },
        meetingBtnContext() {
            if (this.isNotMember) {
                return {
                    text: '모임 가입하기',
                    click: () => (this.showRegisterDialog = true),
                };
            }

            if (this.currentUserInfo.isMaster || this.currentUserInfo.isManager) {
                return {
                    text: '모임 수정하기',
                    click: () => (this.$router.push(generateParamPath(PATH.CLUB.EDIT, [this.clubSeq]))),
                };
            }
            return null;
        },
    },
    methods: {
        requestClubRegister() {
            return actionsHelper.requestClubJoin(this.clubSeq)
                .then(() => {
                    mutationsHelper.openSnackBar('모임 가입 성공');
                    this.showRegisterDialog = false;
                });
        },
    },
};
</script>

<style scoped>
.meeting-btn {
    border-radius: 4px;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
}
</style>
