<template>
  <Chip
    :info="chipInfo"
    :large="large"
    :outlined="outlined"
  />
</template>

<script lang="ts">
import { ClubRole } from '@/utils/role.ts';
import Chip from '@/components/chip/Chip.vue';
import Vue from 'vue';

class RoleChip {

  static readonly MASTER = new RoleChip(ClubRole.MASTER, '모임장', '#e91e63')
  static readonly MANAGER = new RoleChip(ClubRole.MANAGER, '매니저', '#009688')
  static readonly MEMBER = new RoleChip(ClubRole.MEMBER, '모임원', '#2196f3')

  private type: ClubRole;
  private name: string;
  private color: string;

  constructor(type: ClubRole, name: string, color: string) {
    this.type = type;
    this.name = name;
    this.color = color;
  }

  static findByRole(type: string) {
    if (type === this.MASTER.type) {
      return this.MASTER;
    }

    if (type === this.MANAGER.type) {
      return this.MANAGER;
    }

    return this.MEMBER
  }

}

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
    chipInfo(): RoleChip {
      return RoleChip.findByRole(this.role);
    },
  },
});
</script>
