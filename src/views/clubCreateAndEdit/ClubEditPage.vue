<template>
    <div>
        <CommonHeader title="모임 수정"
                      @back="back"
        />
        <ClubCreateAndEditBody btnText="모임 수정"
                               :submitClickCallback="editClub"
                               :context="editContext"
        />
    </div>
</template>

<script>

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreateAndEditBody from '@/views/clubCreateAndEdit/ClubCreateAndEditBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'ClubEditPage',
    components: { CommonHeader, ClubCreateAndEditBody },
    computed: {
        clubInfo: () => gettersHelper.clubInfo(),
        editContext() {
            if (this.clubInfo.seq === 0) {
                this.$router.back();
                return {};
            }
            return {
                name: this.clubInfo.name,
                description: this.clubInfo.description,
                maximumNumber: this.clubInfo.maximumNumber,
                imageUrl: this.clubInfo.mainImageUrl,
                interestList: this.clubInfo.clubInterest.map(({ interest }) => interest),
                regionList: this.clubInfo.clubRegion.map(({ region }) => region),
            };
        },
    },
    methods: {
        back() {
            this.$router.push(PATH.CLUB_LIST);
        },
        editClub(dto) {
            const clubSeq = this.clubInfo.seq;
            return actionsHelper.requestClubChange({ clubSeq, clubChangeRequestDto: dto })
                .then(() => (this.$router.push(generateParamPath(PATH.CLUB.MAIN, [clubSeq]))));
        },
    },
};
</script>

<style scoped>
</style>
