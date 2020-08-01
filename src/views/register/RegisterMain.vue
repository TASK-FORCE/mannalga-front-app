<template>
    <div>
        <CommonHeader title="회원가입" />
        <router-view />
    </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue';

export default {
    name: 'RegisterMain',
    components: { CommonHeader },
};
</script>

<style scoped>

</style>
