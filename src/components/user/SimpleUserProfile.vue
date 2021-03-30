<template>
  <div class="d-flex px-3 align-center">
    <UserProfileAvatar
      :size="40"
      :imgUrl="user.imageUrl"
      :name="user.name"
      :appendNumber="user.seq"
    />
    <div class="ml-3">
      <div class="name">{{ user.name }}</div>
      <!--            <div class="description">{{ description }}</div>-->
    </div>
    <v-spacer />
    <div v-if="user.role">
      <RoleChip
        :role="user.role"
        large
      />
    </div>
  </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import RoleChip from '@/components/chip/RoleChip.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'SimpleUserProfile',
  components: { RoleChip, UserProfileAvatar },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
.name {
  font-size: 0.95rem;
  font-weight: 500;
}

.description {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
}
</style>
