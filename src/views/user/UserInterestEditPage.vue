<template>
    <div v-if="!isLoading">
        <CommonHeader title="관심사 변경"
                      @clickBack="moveToSettingPage"
        />
        <UserInterest />
        <SimpleBtnFooter text="변경하기"
                         :loading="btnLoading"
                         @click="changeRequest"
        />
    </div>
</template>

<script>
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import SimpleBtnFooter from '@/components/ui/footer/SimpleBtnFooter.vue';
import { USER_SETTINGS_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import UserInterest from '@/components/user/UserInterest.vue';
import _ from '@/utils/lodashWrapper.js';

export default {
    name: 'UserInterestEditPage',
    components: { UserInterest, SimpleBtnFooter, CommonHeader },
    data() {
        return {
            btnLoading: false,
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        selectedInterestSeqs: () => gettersHelper.selectedInterestSeqs(),
    },
    created() {
        if (_.isEmpty(this.selectedInterestSeqs)) {
            actionsHelper.requestUserInterests();
        }
    },
    methods: {
        changeRequest() {
            this.btnLoading = true;
            actionsHelper.requestChangeUserInterests(this.selectedInterestSeqs)
                .then(this.$router.push(USER_SETTINGS_PATH)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS)))
                .finally(this.btnLoading = false);
        },
        moveToSettingPage() {
            this.$router.push(USER_SETTINGS_PATH);
        },
    },
};
</script>
