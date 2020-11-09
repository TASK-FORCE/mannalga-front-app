<template>
    <v-container class="pb-0">
        <ClubListMainHeader />
        <ClubListMainTabs />
        <FixedCreateBtn color="blue"
                        :path="clubCreatePath"
        />
        <FixedScrollToTopBtn color="red" />
    </v-container>
</template>

<script>
import ClubListMainHeader from '@/components/club/list/ClubListHeader.vue';
import ClubListMainTabs from '@/components/club/list/ClubListMainTabs.vue';
import FixedCreateBtn from '@/components/ui/button/FixedCreateBtn.vue';
import FixedScrollToTopBtn from '@/components/ui/button/FixedScrollToTopBtn.vue';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

export default {
    name: 'ClubListMainPage',
    components: { FixedScrollToTopBtn, FixedCreateBtn, ClubListMainTabs, ClubListMainHeader },
    data() {
        return {
            clubCreatePath: PATH.CLUB.CREATE,
        };
    },
};
</script>

<style scoped>

</style>
