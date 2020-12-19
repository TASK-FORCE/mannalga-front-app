<template>
    <v-dialog :value="value"
              @click:outside="$emit('input', false)"
    >
        <v-card>
            <div class="pt-3 pb-1 px-4 font-weight-bold"
                 style="font-size: 1.3rem"
            >
                만남 신청을 취소하시겠습니까?
            </div>
            <div class="px-4">
                <div class="mb-2">
                    만남명: {{ meeting.title }}
                </div>
                <MeetingTimeRange :startTime="meeting.startTime"
                                  :endTime="meeting.endTime"
                />
            </div>
            <div class="text-center pa-3">
                <v-btn
                    color="green darken-1"
                    outlined
                    @click="$emit('input', false)"
                >
                    아니오
                </v-btn>
                <v-btn
                    class="ml-3"
                    color="green darken-1"
                    outlined
                    @click="cancelMeeting"
                >
                    예
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'MeetingCancelDialog',
    components: { MeetingTimeRange },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        meeting: {
            type: Object,
            required: true,
        },
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
    },
    beforeDestroy() {
        this.closeDialog();
    },
    methods: {
        cancelMeeting() {
            const payload = {
                clubSeq: this.clubSeq,
                meetingSeq: this.meeting.seq,
            };
            actionsHelper.requestCancelMeetingApplication(payload)
                .finally(this.closeDialog);
        },
        closeDialog() {
            this.$emit('input', false);
        },
    },
};
</script>

<style scoped>

</style>
