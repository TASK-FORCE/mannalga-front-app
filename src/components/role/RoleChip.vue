<template>
    <div class="d-inline-block">
        <span :style="resolveStyle"
              class="root-role-tag"
        >
            {{ chipInfo.name }}
        </span>
    </div>
</template>

<script>
import { CLUB_ROLE } from '@/utils/role.js';

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
        large: {
            type: Boolean,
            default: false,
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
        resolveStyle() {
            if (this.large) {
                return {
                    padding: '6px',
                    fontSize: '0.8rem',
                    backgroundColor: this.chipInfo.color,
                };
            }
            return {
                padding: '4px',
                fontSize: '0.6rem',
                backgroundColor: this.chipInfo.color,
            };
        },
    },
};
</script>

<style scoped>
.root-role-tag {
    font-weight: bold;
    border-radius: 30px;
    color: white;
}
</style>
