<template>
    <InterestSelect
        title="회원가입"
        :backCallback="back"
        :submitCallback="register"
    >
        <template #header-title>
            관심있는 분야를 선택해주세요.
        </template>
        <template #header-description>
            최대 5개까지 선택 가능합니다.
        </template>
    </InterestSelect>
</template>

<script>
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import InterestSelect from '@/components/interest/InterestSelect.vue';
import _ from '@/utils/common/lodashWrapper.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export default {
    name: 'RegisterInterestNestedPage',
    components: { InterestSelect },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
            return;
        }

        if (_.isEmpty(this.selectedRegions)) {
            this.$router.push(PATH.REGISTER.REGION);
        }
    },
    methods: {
        register(selectedInterests) {
            const registerInfo = {
                profile: this.kakaoProfile,
                selectedRegions: this.selectedRegions,
                selectedInterests,
            };

            actionsHelper.postRegister(registerInfo)
                .then(() => this.$router.push(PATH.CLUB_LIST)
                    .then(() => this.$store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_REGISTER)))
                .catch(() => this.$router.push(PATH.REGISTER.PROFILE));
        },
        back() {
            this.$router.push(PATH.REGISTER.REGION);
        },
    },
};
</script>
