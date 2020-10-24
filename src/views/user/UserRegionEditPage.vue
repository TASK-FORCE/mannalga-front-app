<template>
    <div v-if="!isLoading">
        <CommonHeader title="지역변경"
                      @clickBack="moveToSettingPage"
        />
        <UserRegionPriority />
        <SimpleBtnFooter text="변경하기"
                         :loading="btnLoading"
                         @click="changeRequest"
        />
    </div>
</template>

<script>
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import UserRegionPriority from '@/components/user/UserRegionPriority.vue';
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import SimpleBtnFooter from '@/components/ui/footer/SimpleBtnFooter.vue';
import { USER_SETTINGS_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { MESSAGE } from '@/utils/constant/constant.js';

export default {
    name: 'UserRegionEditPage',
    components: { SimpleBtnFooter, CommonHeader, UserRegionPriority },
    data() {
        return {
            btnLoading: false,
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        actionsHelper.requestUserRegions();
    },
    methods: {
        changeRequest() {
            this.btnLoading = true;
            actionsHelper.requestChangeUserRegions(this.selectedRegions)
                .then(this.$router.push(USER_SETTINGS_PATH).then((mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS))))
                .finally(this.btnLoading = false);
        },
        moveToSettingPage() {
            this.$router.push(USER_SETTINGS_PATH);
        },
    },
};
</script>
