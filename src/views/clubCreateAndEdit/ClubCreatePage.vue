<template>
    <div>
        <CommonHeader
            title="모임 만들기"
            @back="back"
        />
        <ClubCreateAndEditBody
            btnText="모임 만들기"
            :submitClickCallback="createClub"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreateAndEditBody from '@/views/clubCreateAndEdit/ClubCreateAndEditBody.vue';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes.ts';
import { ClubWriteRequest } from '@/interfaces/club';

export default Vue.extend({
    name: 'ClubCreatePage',
    components: { CommonHeader, ClubCreateAndEditBody },
    methods: {
        back() {
            this.$router.push(PATH.CLUB_LIST);
        },
        createClub(clubWriteRequest: ClubWriteRequest) {
            return this.$store.dispatch(ActionTypes.REQUEST_CLUB_CREATE, clubWriteRequest)
                .then(() => {
                    this.$store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CLUB_CREATE);
                    this.$router.push(PATH.CLUB_LIST);
                });
        },
    },
});
</script>

<style scoped>
</style>
