<template>
    <div v-if="!isLoading">
        <div class="d-flex pa-3">
            <UserProfileAvatar :size="50"
                               :name="creatorName"
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
                    <v-icon color="green">mdi-cash-usd</v-icon>
                    미정
                </div>
                <div class="f-09 ml-5">
                    <v-icon color="blue">mdi-map-marker</v-icon>
                    미정
                </div>
            </div>
        </div>
        <div class="meeting-middle-spacer"
             :class="isThemeDark ? 'dark-bg' :'white-bg'"
        />
        <div class="meeting-users-box">
            <div class="d-flex pa-2">
                <div class="meeting-users-title my-auto">
                    <v-icon color="#ff9800"
                            large
                    >mdi-account-multiple
                    </v-icon>
                    모임 신청 현황
                    (1/{{ meeting.maximumNumber }})
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
            <v-divider />
            <div>
                <div v-for="applicationUser in meeting.applicationUsers"
                     :key="applicationUser.seq"
                     class="my-2"
                >
                    <SimpleUserProfile :name="applicationUser.name"
                                       :imageUrl="applicationUser.imgUrl"

                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import SimpleUserProfile from '@/components/user/SimpleUserProfile.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import routerParamHelper from '@/router/RouterParamHelper.js';
import { isCurrentThemeDark } from '@/plugins/vuetify.js';

export default {
    name: 'ClubMeetingPostBody',
    components: { SimpleUserProfile, MeetingTimeRange, UserProfileAvatar },
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
            clubSeq: routerParamHelper.clubSeq(),
            meetingSeq: routerParamHelper.meetingSeq(),
        }),
        creatorName() {
            if (this.meeting && this.meeting.registerUser && this.meeting.registerUser.user) {
                return this.meeting.registerUser.user.userName;
            }
            return '';
        },
    },
    created() {
        actionsHelper.requestMeeting(this.clubAndMeetingSeq);
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

.meeting-middle-spacer {
    margin-top: 4px;
    height: 10px;
}

.meeting-users-box {
    margin: 4px;

    .meeting-users-title {
        font-size: 1.2rem;
        font-weight: bold;
    }
}

.white-bg {
    background-color: #eeeded;
}

.dark-bg {
    background-color: #3c3b3b;
}

</style>
