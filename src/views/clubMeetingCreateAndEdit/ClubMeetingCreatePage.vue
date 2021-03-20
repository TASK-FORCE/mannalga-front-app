<template>
    <div>
        <CommonHeader title="만남 생성"
                      @back="$router.push(clubDetailPath())"
        />
        <ClubMeetingCreateAndEditBody btnText="만남 생성"
                                      :submitClickCallback="create"
        />
    </div>
</template>

<script lang="ts">
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubMeetingCreateAndEditBody from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEditBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import actionsHelper from '@/store/helper/ActionsHelper.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubMeetingCreatePage',
    components: { ClubMeetingCreateAndEditBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
        create(clubMeetingCreateDto) {
            const clubMeetingCreateInfo = {
                clubMeetingCreateDto,
                clubSeq: routerHelper.clubSeq(),
            };
            return actionsHelper.requestMeetingCreate(clubMeetingCreateInfo)
                .then(() => {
                    actionsHelper.requestFirstMeetingGroupList(clubMeetingCreateInfo.clubSeq);
                    this.$router.push(generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq()));
                });
        },
    },
});
</script>

<style scoped>

</style>
