<template>
    <div class="d-inline-block">
        <span :style="`background-color: ${chipInfo.color}`"
              class="root-role-tag"
        >
            {{ chipInfo.name }}
        </span>
    </div>
</template>

<script>
import { CLUB_ROLE } from '@/utils/common/constant/constant.js';

const CLUB_CHIP_ROLES = [
    {
        type: CLUB_ROLE.MASTER,
        name: '모임장',
        color: '#e91e63',
    },
    {
        type: CLUB_ROLE.MANAGER,
        name: '매니저',
        color: '#009688',
    },
    {
        type: CLUB_ROLE.MEMBER,
        name: '모임원',
        color: '#2196f3',
    },
];

export default {
    name: 'RoleChip',
    props: {
        role: {
            type: String,
            required: true,
        },
    },
    computed: {
        chipInfo() {
            const clubChipRole = CLUB_CHIP_ROLES.find(({ type }) => type === this.role);
            return {
                name: clubChipRole.name,
                color: clubChipRole.color,
            };
        },
    },
};
</script>

<style scoped>
.root-role-tag {
    padding: 4px;
    font-weight: bold;
    border-radius: 30px;
    font-size: 0.6rem;
    color: white;
}
</style>
