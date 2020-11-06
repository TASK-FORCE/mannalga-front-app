<template>
    <v-container class="pb-0">
        <ClubListHeader />
        <ClubListMainTabs />
        <FixedCreateBtn color="blue"
                        :path="clubCreatePath"
        />
        <FixedScrollToTopBtn color="red" />
    </v-container>
</template>

<script>
import ClubListMainHeader from '@/components/club/clubList/ClubListHeader.vue';
import ClubListMainTabs from '@/components/club/clubList/ClubListMainTabs.vue';
import FixedCreateBtn from '@/components/ui/button/FixedCreateBtn.vue';
import FixedScrollToTopBtn from '@/components/ui/button/FixedScrollToTopBtn.vue';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubListPage',
    components: { FixedScrollToTopBtn, FixedCreateBtn, ClubListMainTabs, ClubListHeader: ClubListMainHeader },
    data() {
        return {
            clubCreatePath: PATH.CLUB.CREATE,
        };
    },
};
</script>

<style scoped>

</style>
