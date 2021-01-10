<template>
    <div v-if="!isLoading">
        <div class="d-flex pa-3">
            <UserProfileAvatar :size="50"
                               :name="creatorName"
                               :appendNumber="appendNumber"
            />
            <div class="ml-2">
                <div class="meeting-title">{{ meeting.title }}</div>
                <div class="meeting-subtitle">
                    {{ creatorName }}
                    <span v-if="meeting.isCreator"
                          class="my-meeting-tag"
                    >
                        내만남
                    </span>
                </div>
            </div>
        </div>
        <div class="pa-1">
            <MeetingTimeRange :startTime="meeting.startTime"
                              :endTime="meeting.endTime"
                              large
            />
            <div class="mt-3 px-2 f-09">
                {{ meeting.content }}
            </div>
        </div>
        <div class="px-3">
            <div class="d-flex px-3 justify-center">
                <div class="f-09">
                    <v-icon style="padding: 2px"
                            color="green"
                            v-text="'$currencyKrw'"
                    />
                    {{ meeting.cost ? meeting.cost : '미정' }}
                </div>
                <div class="f-09 ml-5">
                    <v-icon color="blue">mdi-map-marker</v-icon>
                    {{ meeting.region ? meeting.region : '미정' }}
                </div>
            </div>
        </div>
        <MiddleDivider class="mt-2" />
        <div class="meeting-users-box">
            <div class="d-flex px-2 pt-2">
                <div class="meeting-users-title my-auto">
                    <v-icon color="#ff9800"
                            large
                    >mdi-account-multiple
                    </v-icon>
                    모임 신청 현황
                    ({{ meeting.numberInfoText }})
                </div>
                <v-spacer />
                <v-btn v-if="!meeting.isRegistered"
                       :loading="applicationBtnLoading"
                       class="mt-auto"
                       color="#3f51b5"
                       outlined
                       @click="applyMeetingApplication"
                >
                    모임 신청
                </v-btn>
                <v-btn v-else
                       class="mt-auto"
                       color="#e91e63"
                       outlined
                       @click="cancelMeetingApplication"
                >
                    신청 취소
                </v-btn>
            </div>
            <SimpleUserProfileList :users="meeting.applicationUsers" />
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import { isCurrentThemeDark } from '@/plugins/vuetify.js';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SimpleUserProfileList from '@/components/user/SimpleUserProfileList.vue';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'ClubMeetingPostBody',
    components: { SimpleUserProfileList, MiddleDivider, MeetingTimeRange, UserProfileAvatar },
    data() {
        return {
            applicationBtnLoading: false,
            isThemeDark: isCurrentThemeDark(),
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        meeting: () => gettersHelper.meeting(),
        clubAndMeetingSeq: () => ({
            clubSeq: routerHelper.clubSeq(),
            meetingSeq: routerHelper.meetingSeq(),
        }),
        creatorName() {
            if (this.meeting && this.meeting.registerUser && this.meeting.registerUser.user) {
                return this.meeting.registerUser.user.userName;
            }
            return '';
        },
        appendNumber() {
            if (this.meeting && this.meeting.registerUser && this.meeting.registerUser.user) {
                return this.meeting.registerUser.user.seq;
            }
            return 0;
        },
    },
    created() {
        actionsHelper.requestMeeting(this.clubAndMeetingSeq)
            .catch(() => this.$router.back());
    },
    methods: {
        applyMeetingApplication() {
            this.applicationBtnLoading = true;
            actionsHelper.requestMeetingApplication(this.clubAndMeetingSeq)
                .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_APPLY_MEETING_APPLICATION))
                .finally(() => (this.applicationBtnLoading = false));
        },
        cancelMeetingApplication() {
            this.applicationBtnLoading = true;
            actionsHelper.requestCancelMeetingApplication(this.clubAndMeetingSeq)
                .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CANCEL_MEETING_APPLICATION))
                .finally(() => (this.applicationBtnLoading = false));
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.meeting-title {
    font-weight: 700;
    font-size: 1.05rem;
}

.meeting-subtitle {
    font-size: 0.9rem;
}

.my-meeting-tag {
    background-color: #46a046;
    color: white;
    padding: 4px;
    font-size: 0.7rem;
    font-weight: bold;
}

.meeting-users-box {
    margin: 4px;

    .meeting-users-title {
        font-size: 1.2rem;
        font-weight: bold;
    }
}
</style>
