<template>
  <div class="member-info-wrapper">
    <UserProfileAvatar
      :size="35"
      :imgUrl="user.imgUrl"
      :name="user.name"
      :appendNumber="user.userSeq"
    />
    <div class="member-info">
      <div
        v-if="isMe"
        class="my-tag"
      >
        나
      </div>
      {{ user.name }}
    </div>
    <v-spacer />
    <div class="d-flex">
      <SquareTag
        v-if="managementContext"
        v-ripple
        :text="managementContext.text"
        blur
        class="mr-2 my-auto"
        @click="managementContext.click"
      />
      <RoleTag
        :roleType="user.role[0]"
        class="my-auto"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import SquareTag from '@/components/tag/SquareTag.vue';
import RoleTag from '@/components/tag/RoleTag.vue';
import { ClubRole } from '@/utils/role.ts';
import { ClubUserInfo, CurrentUserInfo } from '@/interfaces/club';
import { ClickWithText } from '@/interfaces/common';

export default Vue.extend({
  name: 'ClubMemberInfo',
  components: { RoleTag, SquareTag, UserProfileAvatar },
  props: {
    user: {
      type: Object as PropType<ClubUserInfo>,
      required: true,
    },
    currentUserInfo: {
      type: Object as PropType<CurrentUserInfo>,
      required: true,
    },
  },
  computed: {
    isMe() {
      return this.user.userSeq === this.currentUserInfo.userSeq;
    },
    managementContext(): ClickWithText | null {
      if (this.currentUserInfo.isMaster) {
        if (this.isMe) return null;
        return {
          text: '관리',
          click: this.openManagementDialog,
        };
      }

      if (this.currentUserInfo.isManager) {
        if (this.isMe) {
          return {
            text: '탈퇴',
            click: this.openWithdrawnDialog,
          };
        }
        if (this.user.role[0] === ClubRole.MASTER || this.user.role[0] === ClubRole.MANAGER) {
          return null;
        }
        return {
          text: '추방',
          click: this.openKickDialog,
        };
      }

      if (this.isMe) {
        return {
          text: '탈퇴',
          click: this.openWithdrawnDialog,
        };
      }

      return null;
    },
  },
  methods: {
    openManagementDialog(): void {
      this.$emit('openManagementDialog', this.user);
    },
    openWithdrawnDialog(): void {
      this.$emit('openWithdrawnDialog');
    },
    openKickDialog(): void {
      this.$emit('openKickDialog', this.user);
    },
  },
});
</script>
<style
  scoped
  lang="scss"
>

.member-info-wrapper {
  display: flex;

  .member-info {
    margin-left: 15px;
    display: flex;
    align-items: center;

    .my-tag {
      font-size: 10px;
      color: #FFFFFF;
      background-color: dimgray;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      margin-right: 3px;
    }

    .name {
      font-size: 18px;
      color: #292929;
    }
  }
}

.theme--dark {
  .name {
    color: #F5F5F5;
  }
}
</style>
