<template>
    <div class="meeting-members-wrapper">
        <div class="title">
            모임 멤버 ({{ simpleUsers.length }}/{{ clubInfo.maximumNumber }})
        </div>
        <div class="member-infos">
            <div v-for="user in simpleUsers"
                 :key="user.seq"
                 class="mt-3"
            >
                <ClubMemberInfo :user="user"
                                :currentUserInfo="currentUserInfo"
                                @openWithdrawnDialog="openWithdrawnDialog"
                                @openKickDialog="openKickDialog"
                                @openManagementDialog="openManagementDialog"
                />
            </div>
        </div>
        <YesOrNoDialog v-model="withdrawnDialog"
                       title="정말로 탈퇴하시겠습니까?"
                       :submitPromiseCallback="withdraw"
        >
            <template #description>
                <div class="ml-2">
                    확인 시 즉시 탈퇴됩니다.
                </div>
            </template>
        </YesOrNoDialog>

        <YesOrNoDialog v-model="kickDialog"
                       title="추방하시겠습니까?"
                       :submitPromiseCallback="kick"
        >
            <template #description>
                <div v-if="kickTargetUser"
                     class="member-info-wrapper"
                >
                    <UserProfileAvatar :size="35"
                                       :imgUrl="kickTargetUser.imageUrl"
                                       :name="kickTargetUser.name"
                                       :appendNumber="kickTargetUser.seq"
                    />
                    <div class="member-info">
                        {{ kickTargetUser.name }}
                    </div>
                </div>
            </template>
        </YesOrNoDialog>

        <v-dialog :value="managementDialog"
                  persistent
        >
            <v-card v-if="managementTargetUser"
                    class="pa-3"
            >
                <div class="member-info-wrapper">
                    <UserProfileAvatar :size="35"
                                       :imgUrl="managementTargetUser.imageUrl"
                                       :name="managementTargetUser.name"
                                       :appendNumber="managementTargetUser.seq"
                    />
                    <div class="member-info">
                        {{ managementTargetUser.name }}
                    </div>
                    <v-spacer />
                    <v-btn class="white--text mr-1"
                           icon
                           @click="closeManagementDialog"
                    >
                        <v-icon large
                                v-text="'$close'"
                        />
                    </v-btn>
                </div>

                <MiddleDivider :height="1"
                               class="my-2"
                />
                <div class="d-flex justify-center">
                    <div>
                        <v-btn v-if="managementTargetUser.role === 'CLUB_MEMBER'"
                               @click="toManagerFromMember"
                        >
                            매니저로 지정
                        </v-btn>
                        <v-btn v-else
                               @click="toMemberFromManager"
                        >
                            모임원으로 강등
                        </v-btn>
                    </div>
                    <v-btn class="ml-3"
                           @click="kickByManagementDialog"
                    >
                        추방하기
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ClubMemberInfo from '@/components/user/ClubMemberInfo.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import routerHelper from '@/router/RouterHelper.js';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import { CLUB_ROLE } from '@/utils/role.js';
import MiddleDivider from '@/components/MiddleDivider.vue';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export default {
    name: 'ClubDetailMainMember',
    components: { MiddleDivider, UserProfileAvatar, YesOrNoDialog, ClubMemberInfo },
    props: {
        clubUserList: Array,
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
            withdrawnDialog: false,
            kickDialog: false,
            kickTargetUser: null,
            managementDialog: false,
            managementTargetUser: null,
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        simpleUsers() {
            return this.clubUserList.map(user => ({
                seq: user.userSeq,
                clubUserSeq: user.clubUserSeq,
                imageUrl: user.imgUrl,
                name: user.name,
                role: user.role.length > 0 ? user.role[0] : null,
            }));
        },
    },
    methods: {
        openWithdrawnDialog() {
            this.withdrawnDialog = true;
        },
        openKickDialog(user) {
            this.kickTargetUser = user;
            this.kickDialog = true;
        },
        openManagementDialog(user) {
            this.managementTargetUser = user;
            this.managementDialog = true;
        },
        withdraw() {
            return actionsHelper.requestClubWithdraw(this.clubSeq)
                .then(() => {
                    this.$store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.WITHDRAW_CLUB);
                    this.$router.go();
                });
        },
        kick() {
            return actionsHelper.requestKickUser({
                clubSeq: this.clubSeq,
                clubUserSeq: this.kickTargetUser.clubUserSeq,
            })
                .finally(() => (this.kickDialog = false));
        },
        kickByManagementDialog() {
            return actionsHelper.requestKickUser({
                clubSeq: this.clubSeq,
                clubUserSeq: this.managementTargetUser.clubUserSeq,
            })
                .finally(() => this.closeManagementDialog());
        },
        toManagerFromMember() {
            return actionsHelper.requestChangeUserRole({
                clubSeq: this.clubSeq,
                clubUserSeq: this.managementTargetUser.clubUserSeq,
                role: CLUB_ROLE.MANAGER,
            })
                .finally(() => this.closeManagementDialog());
        },
        toMemberFromManager() {
            return actionsHelper.requestChangeUserRole({
                clubSeq: this.clubSeq,
                clubUserSeq: this.managementTargetUser.clubUserSeq,
                role: CLUB_ROLE.MEMBER,
            })
                .finally(() => this.closeManagementDialog());
        },
        closeManagementDialog() {
            this.managementDialog = false;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.meeting-members-wrapper {
    padding: 20px 15px;

    .title {
        font-size: 17px;
        font-weight: bold;
        color: #292929;
    }

    .member-infos {
        margin-top: 20px;
    }

}

.member-info-wrapper {
    display: flex;

    .member-info {
        margin-left: 15px;
        display: flex;
        align-items: center;

    }
}

.theme--dark {
    .title {
        color: #F5F5F5;
    }
}
</style>
