<template>
    <div class="py-8">
        <div class="avatar-wrapper">
            <div class="p-relative d-inline-block">
                <UserProfileAvatar
                    :size="90"
                    :name="userProfile.userName"
                    :appendNumber="userProfile.seq"
                    :imgUrl="userProfile.profileImageLink"
                />
                <v-btn
                    class="avatar-edit-btn"
                    fab
                    @click="$refs.imageSelector.trigger()"
                >
                    <v-icon
                        size="18"
                        v-text="'$camera'"
                    />
                </v-btn>
            </div>
        </div>
        <div class="name">
            {{ userProfile.userName }}
        </div>
        <v-spacer />
        <ImageSelectorWithConfirm
            ref="imageSelector"
            title="변경 후 프로필 이미지"
            :aspectRatio="1"
            :imageChangeCallback="changeProfileImage"
        >
            <template #image="{ imageUrl }">
                <UserProfileAvatar
                    :imgUrl="imageUrl"
                    :size="200"
                />
            </template>
        </ImageSelectorWithConfirm>
        <div class="pt-5">
            <SettingBar
                title="지역"
                icon="mapMarker"
                :description="regionNames"
                @click="moveToRegionEditPage"
            />
            <SettingBar
                title="관심사"
                icon="windmill"
                :description="interestNames"
                class="mt-3"
                @click="moveToInterestEditPage"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import ImageSelectorWithConfirm from '@/components/image/ImageSelectorWithConfirm.vue';
import _ from '@/utils/common/lodashWrapper.ts';
import { PATH } from '@/router/route_path_type.ts';
import SettingBar from '@/components/SettingBar.vue';
import { UploadImageResponse } from '@/interfaces/common';
import { UserProfile } from '@/interfaces/user';
import { UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'UserSettingProfile',
    components: { SettingBar, ImageSelectorWithConfirm, UserProfileAvatar },
    props: {
        userProfile: Object as PropType<UserProfile>,
    },
    data() {
        return {
            dialogOpen: false,
            loading: false,
        };
    },
    computed: {
        regionsByPriority() {
            return _.sortBy(this.userProfile.userRegions, ({ priority }) => priority)
                .map(({ region }) => region);
        },
        regionNames() {
            if (this.regionsByPriority && this.regionsByPriority.length > 0) {
                return this.regionsByPriority.map(({ name }) => name).reduce((prev, cur) => `${prev} | ${cur}`);
            }
            return '';
        },
        interestsByPriority() {
            return _.sortBy(this.userProfile.userInterests, ({ priority }) => priority)
                .map(({ interest }) => interest);
        },
        interestNames() {
            if (this.interestsByPriority && this.interestsByPriority.length > 0) {
                return this.interestsByPriority.map(({ name }) => name).reduce((prev, cur) => `${prev} | ${cur}`);
            }
            return '';
        },
    },
    methods: {
        changeProfileImage(uploadImageResponse: UploadImageResponse) {
            return this.$store.dispatch(UserActionTypes.REQUEST_CHANGE_USER_PROFILE, uploadImageResponse);
        },
        moveToRegionEditPage() {
            this.$router.push(PATH.USER.REGION_EDIT);
        },
        moveToInterestEditPage() {
            this.$router.push(PATH.USER.INTEREST_EDIT);
        },
    },
});
</script>

<style
    scoped
    lang="scss"
>
.avatar-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;

    .avatar-edit-btn {
        color: #9f9f9f !important;
        background-color: #F5F5F5 !important;
        width: 27px;
        height: 27px;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 1px solid #D4D4D4;
    }
}

.name {
    color: #292929;
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    padding-bottom: 25px;
}

.windmill {
    margin-left: 3px;
}

.theme--dark {
    .name {
        color: #F5F5F5;
    }
}
</style>
