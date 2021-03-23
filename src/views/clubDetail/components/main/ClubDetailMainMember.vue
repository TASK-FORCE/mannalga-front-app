<template>
  <div class="meeting-members-wrapper">
    <div class="title">
      모임 멤버 ({{ clubUserList.length }}/{{ clubInfo.maximumNumber }})
    </div>
    <div class="member-infos">
      <div
        v-for="clubUser in clubUserList"
        :key="clubUser.seq"
        class="mt-3"
      >
        <ClubMemberInfo
          :user="clubUser"
          :currentUserInfo="currentUserInfo"
          @openWithdrawnDialog="openWithdrawnDialog"
          @openKickDialog="openKickDialog"
          @openManagementDialog="openManagementDialog"
        />
      </div>
    </div>
    <YesOrNoDialog
      v-model="withdrawnDialog"
      title="정말로 탈퇴하시겠습니까?"
      :submitPromiseCallback="withdraw"
    >
      <template #description>
        <div class="ml-2">
          확인 시 즉시 탈퇴됩니다.
        </div>
      </template>
    </YesOrNoDialog>

    <YesOrNoDialog
      v-model="kickDialog"
      title="추방하시겠습니까?"
      :submitPromiseCallback="kick"
    >
      <template #description>
        <div
          v-if="kickTargetUser"
          class="member-info-wrapper"
        >
          <UserProfileAvatar
            :size="35"
            :imgUrl="kickTargetUser?.imageUrl"
            :name="kickTargetUser?.name"
            :appendNumber="kickTargetUser?.seq"
          />
          <div class="member-info">
            {{ kickTargetUser.name }}
          </div>
        </div>
      </template>
    </YesOrNoDialog>

    <v-dialog
      :value="managementDialog"
      persistent
    >
      <v-card
        v-if="managementTargetUser"
        class="pa-3"
      >
        <div class="member-info-wrapper">
          <UserProfileAvatar
            :size="35"
            :imgUrl="managementTargetUser.imageUrl"
            :name="managementTargetUser.name"
            :appendNumber="managementTargetUser.seq"
          />
          <div class="member-info">
            {{ managementTargetUser.name }}
          </div>
          <v-spacer />
          <v-btn
            class="white--text mr-1"
            icon
            @click="closeManagementDialog"
          >
            <v-icon
              large
              v-text="'$close'"
            />
          </v-btn>
        </div>

        <MiddleDivider
          :height="1"
          class="my-2"
        />
        <div class="d-flex justify-center">
          <div>
            <v-btn
              v-if="managementTargetUser.role === 'CLUB_MEMBER'"
              @click="toManagerFromMember"
            >
              매니저로 지정
            </v-btn>
            <v-btn
              v-else
              @click="toMemberFromManager"
            >
              모임원으로 강등
            </v-btn>
          </div>
          <v-btn
            class="ml-3"
            @click="kickByManagementDialog"
          >
            추방하기
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ClubMemberInfo from '@/components/user/ClubMemberInfo.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import routerHelper from '@/router/RouterHelper.ts';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import { CLUB_ROLE } from '@/utils/role.ts';
import MiddleDivider from '@/components/MiddleDivider.vue';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { ClubUserInfo, CurrentUserInfo } from '@/interfaces/club';
import { ClubActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
  name: 'ClubDetailMainMember',
  components: { MiddleDivider, UserProfileAvatar, YesOrNoDialog, ClubMemberInfo },
  props: {
    clubUserList: Array as PropType<ClubUserInfo[]>,
    clubInfo: {
      type: Object,
      required: true,
    },
    currentUserInfo: {
      type: Object as PropType<CurrentUserInfo>,
      required: true,
    },
  },
  data() {
    return {
      withdrawnDialog: false,
      kickDialog: false,
      kickTargetUser: undefined as ClubUserInfo | undefined,
      managementDialog: false,
      managementTargetUser: undefined as ClubUserInfo | undefined,
    };
  },
  computed: {
    clubSeq: (): number => routerHelper.clubSeq(),
  },
  methods: {
    openWithdrawnDialog() {
      this.withdrawnDialog = true;
    },
    openKickDialog(user: ClubUserInfo) {
      this.kickTargetUser = user;
      this.kickDialog = true;
    },
    openManagementDialog(user: ClubUserInfo) {
      this.managementTargetUser = user;
      this.managementDialog = true;
    },
    withdraw() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_CLUB_WITHDRAW, this.clubSeq)
        .then(() => {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.WITHDRAW_CLUB);
          this.$router.go(0);
        });
    },
    kick() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_KICK_USER,
        {
          clubSeq: this.clubSeq,
          clubUserSeq: this.kickTargetUser?.clubUserSeq,
        }
      ).finally(() => (this.kickDialog = false));
    },
    kickByManagementDialog() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_KICK_USER,
        {
          clubSeq: this.clubSeq,
          clubUserSeq: this.managementTargetUser?.clubUserSeq,
        }
      ).finally(() => this.closeManagementDialog());
    },
    toManagerFromMember() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_CHANGE_USER_ROLE,
        {
          clubSeq: this.clubSeq,
          clubUserSeq: this.managementTargetUser?.clubUserSeq,
          role: CLUB_ROLE.MANAGER,
        }
      ).finally(() => this.closeManagementDialog());
    },
    toMemberFromManager() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_CHANGE_USER_ROLE,
        {
          clubSeq: this.clubSeq,
          clubUserSeq: this.managementTargetUser?.clubUserSeq,
          role: CLUB_ROLE.MEMBER,
        }
      ).finally(() => this.closeManagementDialog());
    },
    closeManagementDialog() {
      this.managementDialog = false;
    },
  },
});
</script>

<style
  scoped
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
