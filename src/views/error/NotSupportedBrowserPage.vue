<template>
  <div class="wh-100 d-flex align-center justify-center">
    <EmptyPage
      icon="earthOff"
      title="잘못된 접근입니다."
    >
      <template #description>
        해당 브라우저는 지원하지 않습니다.
        <br/>
        다른 브라우저로 다시 시도해주세요.
      </template>
    </EmptyPage>
  </div>
</template>

<script>
import EmptyPage from '@/components/EmptyPage.vue';

export default {
  name: 'NotSupportedBrowserPage',
  components: { EmptyPage },
};
</script>

<style scoped>

</style>
