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
                />
            </div>
        </div>
    </div>
</template>

<script>
import ClubMemberInfo from '@/components/user/ClubMemberInfo.vue';

export default {
    name: 'ClubDetailMainMember',
    components: { ClubMemberInfo },
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
    computed: {
        simpleUsers() {
            return this.clubUserList.map(user => ({
                seq: user.userSeq,
                imageUrl: user.imgUrl,
                name: user.name,
                role: user.role.length > 0 ? user.role[0] : null,
            }));
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

.theme--dark {
    .title {
        color: #F5F5F5;
    }
}
</style>
