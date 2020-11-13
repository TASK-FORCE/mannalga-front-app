<template>
    <v-container>
        <CommonHeader title="회원가입" />
        <router-view />
    </v-container>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';

export default {
    name: 'RegisterRootPage',
    components: { CommonHeader },
};
</script>

<style scoped>

</style>
