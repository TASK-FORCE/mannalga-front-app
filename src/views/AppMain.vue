<template>
    <v-container class="pb-0">
        <MainHeader />
        <AppMainClubTabs />
        <CommonCreateBtn color="blue"
                         :path="clubCreatePath"
        />
        <CommonScrollToTopBtn color="red"/>
    </v-container>
</template>

<script>
import MainHeader from '@/components/AppMainHeader.vue';
import AppMainClubTabs from '@/components/AppMainClubTabs.vue';
import CommonCreateBtn from '@/components/common/CommonCreateBtn.vue';
import { CLUB_CREATE_PATH } from '@/router/route_path_type.js';
import CommonScrollToTopBtn from '@/components/common/CommonScrollToTopBtn.vue';

export default {
    name: 'AppMain',
    components: { CommonScrollToTopBtn, CommonCreateBtn, AppMainClubTabs, MainHeader },
    data() {
        return {
            clubCreatePath: CLUB_CREATE_PATH,
        };
    },
};
</script>

<style scoped>

</style>
