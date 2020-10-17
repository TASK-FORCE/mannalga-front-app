<template>
    <v-container>
        <CommonHeader title="회원가입" />
        <router-view />
    </v-container>
</template>

<script>
import CommonHeader from '@/components/ui/header/CommonHeader.vue';

export default {
    name: 'RegisterMainPage',
    components: { CommonHeader },
};
</script>

<style scoped>

</style>
