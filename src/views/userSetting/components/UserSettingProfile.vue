<template>
    <div class="py-8">
        <div class="avatar-wrapper">
            <div class="p-relative d-inline-block">
                <UserProfileAvatar :size="90"
                                   :name="userProfile.userName"
                                   :appendNumber="userProfile.seq"
                                   :imgUrl="userProfile.profileImageLink"
                />
                <v-btn class="avatar-edit-btn"
                       fab
                       @click="$refs.imageSelector.trigger()"
                >
                    <v-icon size="18"
                            v-text="'$camera'"
                    />
                </v-btn>
            </div>
        </div>
        <div class="name">
            {{ userProfile.userName }}
        </div>
        <v-spacer />
        <ImageSelectorWithConfirm ref="imageSelector"
                                  title="변경 후 프로필 이미지"
                                  :aspectRatio="1"
                                  :imageChangeCallback="changeProfileImage"
        >
            <template #image="{ imageUrl }">
                <UserProfileAvatar :imgUrl="imageUrl"
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

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import ImageSelectorWithConfirm from '@/components/image/ImageSelectorWithConfirm.vue';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import SettingBar from '@/components/SettingBar.vue';

export default {
    name: 'UserSettingProfile',
    components: { SettingBar, ImageSelectorWithConfirm, UserProfileAvatar },
    props: {
        userProfile: Object,
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
        changeProfileImage(imageDto) {
            return actionsHelper.requestChangeUserProfile(imageDto);
        },
        moveToRegionEditPage() {
            this.$router.push(PATH.USER.REGION_EDIT);
        },
        moveToInterestEditPage() {
            this.$router.push(PATH.USER.INTEREST_EDIT);
        },
    },
};
</script>

<style scoped
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

.icon {
    color: #292929 !important;
}

.chevron {
    color: #9f9f9f !important;
}

.windmill {
    margin-left: 3px;
}

.region-title, .interest-title {
    color: #292929;
    font-weight: 500;
    font-size: 16px;
    width: 70px;
}

.chevron-box {
    width: 30px;
}

.region-name, .interest-name {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    margin-right: 4px;
    margin-left: 4px;
    word-break: keep-all;
    text-align: right;
    width: 100%;
}
</style>
