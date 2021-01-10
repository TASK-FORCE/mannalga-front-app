<template>
    <div class="px-1">
        <div class="member-title ml-2 mt-2">
            <v-icon color="#ff9800"
                    large
                    v-text="'$twoPeople'"
            />
            모임 멤버({{ simpleUsers.length }})
        </div>
        <SimpleUserProfileList :users="simpleUsers" />
    </div>
</template>

<script>
import SimpleUserProfileList from '@/components/user/SimpleUserProfileList.vue';

export default {
    name: 'ClubDetailMainMember',
    components: { SimpleUserProfileList },
    props: {
        clubUserList: Array,
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

<style scoped>
.member-title {
    font-size: 1.4rem;
    font-weight: bold;
}
</style>
