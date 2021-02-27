<template>
    <SquareTag :text="role.name"
               :bgColor="role.color"
               @click="$emit('click')"
    />
</template>

<script>
import SquareTag from '@/components/tag/SquareTag.vue';
import { CLUB_ROLE } from '@/utils/role.js';

const ROLES = [
    {
        type: CLUB_ROLE.MASTER,
        name: '모임장',
        color: '#2883C6',
    },
    {
        type: CLUB_ROLE.MANAGER,
        name: '매니저',
        color: '#E8984E',
    },
    {
        type: CLUB_ROLE.MEMBER,
        name: '모임원',
        color: '#7CBB72',
    },
];

export default {
    name: 'RoleTag',
    components: { SquareTag },
    props: {
        roleType: String,
    },
    computed: {
        role() {
            return ROLES.find(({ type }) => type === this.roleType);
        },
    },
};
</script>

<style scoped>

</style>
