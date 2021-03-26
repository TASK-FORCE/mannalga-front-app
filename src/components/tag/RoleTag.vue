<template>
  <SquareTag
    :text="role.name"
    :bgColor="role.color"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import SquareTag from '@/components/tag/SquareTag.vue';
import { ClubRole } from '@/utils/role.ts';
import Vue from 'vue';

const ROLES = [
  {
    type: ClubRole.MASTER,
    name: '모임장',
    color: '#2883C6',
  },
  {
    type: ClubRole.MANAGER,
    name: '매니저',
    color: '#E8984E',
  },
  {
    type: ClubRole.MEMBER,
    name: '모임원',
    color: '#7CBB72',
  },
];

export default Vue.extend({
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
});
</script>

<style scoped>

</style>
