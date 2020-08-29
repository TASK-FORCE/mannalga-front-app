<template>
    <v-container>
        <CommonHeader title="회원가입" />
        <router-view />
    </v-container>
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
