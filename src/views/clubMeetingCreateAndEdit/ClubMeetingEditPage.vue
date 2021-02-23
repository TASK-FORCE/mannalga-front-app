<template>
    <div>
        <CommonHeader title="만남 수정"
                      @back="$router.push(clubDetailPath())"
        />
        <ClubMeetingCreateAndEditBody btnText="만남 수정"
                                      :context="editContext"
                                      :submitClickCallback="edit"
        />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubMeetingCreateAndEditBody from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEditBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

export default {
    name: 'ClubMeetingEditPage',
    components: { ClubMeetingCreateAndEditBody, CommonHeader },
    computed: {
        meeting: () => gettersHelper.meeting(),
        editContext() {
            if (this.meeting.seq === 0) {
                this.$router.back();
                return {};
            }
            const startDateTimeToken = this.meeting.startTimestamp.split(' ');
            const endDateTimeToken = this.meeting.endTimestamp.split(' ');
            return {
                title: this.meeting.title,
                content: this.meeting.content,
                maximumNumber: this.meeting.maximumNumber,
                cost: this.meeting.cost,
                region: this.meeting.region,
                startDateTime: { date: startDateTimeToken[0], time: startDateTimeToken[1].substring(0, 5) },
                endDateTime: { date: endDateTimeToken[0], time: endDateTimeToken[1].substring(0, 5) },
            };
        },
    },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
        edit(clubMeetingEditDto) {
            const clubSeq = routerHelper.clubSeq();
            const meetingSeq = routerHelper.meetingSeq();
            const clubMeetingEditInfo = {
                clubMeetingEditDto,
                clubSeq,
                meetingSeq,
            };
            return actionsHelper.requestMeetingEdit(clubMeetingEditInfo)
                .then(() => {
                    actionsHelper.requestFirstMeetingGroupList(clubMeetingEditInfo.clubSeq);
                    this.$router.push(generateParamPath(PATH.CLUB.MEETING_POST, [clubSeq, meetingSeq]));
                });
        },
    },
};
</script>

<style scoped>

</style>
