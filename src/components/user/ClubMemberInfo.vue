<template>
    <div class="member-info-wrapper">
        <UserProfileAvatar :size="35"
                           :imgUrl="user.imageUrl"
                           :name="user.name"
                           :appendNumber="user.seq"
        />
        <div class="member-info">
            <div v-if="isMe"
                 class="my-tag"
            >
                나
            </div>
            {{ user.name }}
        </div>
        <v-spacer />
        <div class="d-flex">
            <SquareTag v-if="manageTagText"
                       v-ripple
                       :text="manageTagText"
                       blur
                       class="mr-2"
            />
            <RoleTag :roleType="user.role" />
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import SquareTag from '@/components/tag/SquareTag.vue';
import RoleTag from '@/components/tag/RoleTag.vue';
import { CLUB_ROLE } from '@/utils/role.js';

export default {
    name: 'ClubMemberInfo',
    components: { RoleTag, SquareTag, UserProfileAvatar },
    props: {
        user: {
            type: Object,
            required: true,
        },
        currentUserInfo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isMe() {
            return false;
        },
        manageTagText() {
            if (this.currentUserInfo.isMaster) {
                if (this.isMe) return '';
                return '관리';
            }

            if (this.currentUserInfo.isManager) {
                if (this.isMe) {
                    return '탈퇴';
                }
                if (this.user.role === CLUB_ROLE.MASTER) {
                    return '';
                }
                return '추방';
            }

            if (this.isMe) {
                return '탈퇴';
            }

            return '';
        },
    },
};
</script>

<style scoped
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
