<template>
    <div>
        <CommonHeader title="모임 만들기"
                      @back="back"
        />
        <ClubCreateAndEditBody btnText="모임 만들기"
                               :submitClickCallback="createClub"
        />
    </div>
</template>

<script>

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreateAndEditBody from '@/views/clubCreateAndEdit/ClubCreateAndEditBody.vue';
import { PATH } from '@/router/route_path_type.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export default {
    name: 'ClubCreatePage',
    components: { CommonHeader, ClubCreateAndEditBody },
    methods: {
        back() {
            this.$router.push(PATH.CLUB_LIST);
        },
        createClub(dto) {
            return actionsHelper.requestClubCreate(dto)
                .then(() => {
                    this.$store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CLUB_CREATE);
                    this.$router.push(PATH.CLUB_LIST);
                });
        },
    },
};
</script>

<style scoped>
</style>
