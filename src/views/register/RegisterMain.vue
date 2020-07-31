<template>
    <div>
        <CommonHeader title="회원 가입" />
        <router-view />
    </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';

export default {
    name: 'RegisterMain',
    components: { CommonHeader },
};
</script>

<style scoped>

</style>
