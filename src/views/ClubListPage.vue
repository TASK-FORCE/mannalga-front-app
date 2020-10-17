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
import ClubListMainHeader from '@/components/clubList/ClubListHeader.vue';
import ClubListMainTabs from '@/components/clubList/ClubListMainTabs.vue';
import FixedCreateBtn from '@/components/ui/button/FixedCreateBtn.vue';
import { CLUB_CREATE_PATH } from '@/router/route_path_type.js';
import FixedScrollToTopBtn from '@/components/ui/button/FixedScrollToTopBtn.vue';

export default {
    name: 'ClubListPage',
    components: { FixedScrollToTopBtn, FixedCreateBtn, ClubListMainTabs, ClubListHeader: ClubListMainHeader },
    data() {
        return {
            clubCreatePath: CLUB_CREATE_PATH,
        };
    },
};
</script>

<style scoped>

</style>
