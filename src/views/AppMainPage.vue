<template>
    <v-container class="pb-0">
        <AppMainHeader />
        <AppMainClubTabs />
        <FixedCreateBtn color="blue"
                        :path="clubCreatePath"
        />
        <FixedScrollToTopBtn color="red" />
    </v-container>
</template>

<script>
import AppMainHeader from '@/components/clubList/AppMainHeader.vue';
import AppMainClubTabs from '@/components/clubList/AppMainClubTabs.vue';
import FixedCreateBtn from '@/components/ui/button/FixedCreateBtn.vue';
import { CLUB_CREATE_PATH } from '@/router/route_path_type.js';
import FixedScrollToTopBtn from '@/components/ui/button/FixedScrollToTopBtn.vue';

export default {
    name: 'AppMainPage',
    components: { FixedScrollToTopBtn, FixedCreateBtn, AppMainClubTabs, AppMainHeader },
    data() {
        return {
            clubCreatePath: CLUB_CREATE_PATH,
        };
    },
};
</script>

<style scoped>

</style>
