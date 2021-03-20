<template>
    <Chip :info="chipInfo"
          :large="large"
          :outlined="outlined"
    />
</template>

<script lang="ts">
import { CLUB_ROLE } from '@/utils/role.ts';
import Chip from '@/components/chip/Chip.vue';
import Vue from 'vue';

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

export default Vue.extend({
    name: 'RoleChip',
    components: { Chip },
    props: {
        role: {
            type: String,
            required: true,
        },
        large: {
            type: Boolean,
            default: false,
        },
        outlined: {
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
    },
});
</script>
