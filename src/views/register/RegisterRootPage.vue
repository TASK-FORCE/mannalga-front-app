<template>
    <v-container>
        <CommonHeader title="회원가입"
                      @click="clickBack"
        />
        <router-view />
    </v-container>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'RegisterRootPage',
    components: { CommonHeader },
    methods: {
        clickBack() {
            const path = this.$route.fullPath;
            if (path === PATH.REGISTER.PROFILE) {
                this.$router.push(PATH.LOGIN);
            } else if (path === PATH.REGISTER.REGION) {
                this.$router.push(PATH.REGISTER.PROFILE);
            } else if (path === PATH.REGISTER.INTEREST) {
                this.$router.push(PATH.REGISTER.INTEREST);
            }
        },
    },
};
</script>

<style scoped>

</style>
