<template>
    <div v-if="!isLoading">
        <CommonHeader title="관심사 변경"
                      @click="moveToSettingPage"
        />
        <UserInterest />
        <SimpleBtnFooter text="변경하기"
                         :loading="btnLoading"
                         @click="changeRequest"
        />
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import SimpleBtnFooter from '@/components/ui/footer/SimpleBtnFooter.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import UserInterest from '@/components/user/UserInterest.vue';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';

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
                .then(this.$router.push(PATH.USER.SETTINGS)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS)))
                .finally(this.btnLoading = false);
        },
        moveToSettingPage() {
            this.$router.push(PATH.USER.SETTINGS);
        },
    },
};
</script>
