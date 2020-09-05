<template>
  <div>
      <ClubHeader clubName="독서모임"/><!-- @TODO 모임명 가져오기 -->
      <ClubTab />
  </div>
</template>

<script>
import ClubHeader from '@/components/club/ClubHeader.vue';
import ClubTab from '@/components/club/ClubTab.vue';

export default {
    name: 'ClubMain',
    components: { ClubHeader, ClubTab },
};
</script>
