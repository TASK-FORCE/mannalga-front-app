<template>
    <div v-if="!isLoading">
        <CommonHeader title="지역변경"
                      @click="moveToSettingPage"
        />
        <UserRegionPriority />
        <SimpleBtnFooter text="변경하기"
                         :loading="btnLoading"
                         @click="changeRequest"
        />
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import UserRegionPriority from '@/components/user/UserRegionPriority.vue';
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import SimpleBtnFooter from '@/components/ui/footer/SimpleBtnFooter.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';

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
        if (_.isEmpty(this.selectedRegions)) {
            actionsHelper.requestUserRegions();
        }
    },
    methods: {
        changeRequest() {
            this.btnLoading = true;
            actionsHelper.requestChangeUserRegions(this.selectedRegions)
                .then(this.$router.push(PATH.USER.SETTINGS)
                    .then((mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS))))
                .finally(this.btnLoading = false);
        },
        moveToSettingPage() {
            this.$router.push(PATH.USER.SETTINGS);
        },
    },
};
</script>
