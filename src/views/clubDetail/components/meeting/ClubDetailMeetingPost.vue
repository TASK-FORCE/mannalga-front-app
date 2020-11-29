<template>
    <v-list-item class="pa-0 p-relative">
        <div v-show="meeting.isCreator"
             class="my-meeting-flag"
        >
            <div class="my-meeting-text">내<br />만<br />남</div>
        </div>
        <div v-ripple
             class="flex-grow-1"
             @click="log('메인페이지')"
        >
            <div class="px-2 py-2">
                <div class="text-center f-07">
                    <span class="meeting-time-text">{{ meeting.startTime }}</span>
                    <span class="mx-1 font-weight-bold">~</span>
                    <span class="meeting-time-text">{{ meeting.endTime }}</span>
                </div>
                <div class="text-center py-1">{{ meeting.title }}</div>
                <div class="d-flex px-3">
                <span class="f-07">
                    <v-icon small>mdi-cash-usd</v-icon>
                    미정
                </span>
                    <v-spacer />
                    <span class="f-07">
                    <v-icon small>mdi-map-marker</v-icon>
                    미정
                </span>
                    <v-spacer />
                    <span class="f-07">
                   <v-icon small>mdi-account-multiple</v-icon>
                    1/20
                </span>
                </div>
            </div>
        </div>
        <div class="pr-2">
            <div class="p-relative">
                <v-btn outlined
                       class="pa-0"
                       width="60"
                       :height="meeting.isRegistered ? 40 : 60"
                       color="#3f51b5"
                       :disabled="meeting.isRegistered"
                       @click="log('신청')"
                >
                    <span v-if="meeting.isRegistered"
                          class="register-success-text"
                    >
                        신청완료
                    </span>
                    <span v-else>만남<br />신청</span>
                </v-btn>
            </div>
            <v-chip v-show="meeting.isRegistered"
                    outlined
                    x-small
                    class="font-weight-bold py-2 f-07 mt-1"
                    color="#e91e63"
                    @click="log('신청취소')"
            >
                신청 취소
            </v-chip>
        </div>
    </v-list-item>
</template>

<script>
export default {
    name: 'ClubDetailMeetingPost',
    props: {
        meeting: Object,
    },
    methods: {
        log(text) {
            console.log(text);
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.register-success-text {
    font-size: 0.8rem;
    font-weight: bold;
    color: #2196f3;
}

.my-meeting-flag {
    position: absolute;
    height: 100%;
    width: 15px;
    background-color: #46a046;

    .my-meeting-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 0.7rem;
        font-weight: bold;
    }
}

.meeting-time-text {
    border: 1px solid black;
    padding: 2px 8px;
    border-radius: 10px;
}
</style>
