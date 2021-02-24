<template>
    <div v-show="!isLoading">
        <InterestSelect title="관심사 설정"
                        :backCallback="back"
                        :submitCallback="submit"
                        :selectedInterestsCallback="selectedInterestsCallback"
        >
            <template #header-title>
                관심있는 분야를 선택해주세요.
            </template>
            <template #header-description>
                최대 5개까지 선택 가능합니다.
            </template>
        </InterestSelect>
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import InterestSelect from '@/components/interest/InterestSelect.vue';

export default {
    name: 'UserInterestEditPage',
    components: { InterestSelect },
    data() {
        return {
            btnLoading: false,
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    methods: {
        submit(selectedInterests) {
            return actionsHelper.requestChangeUserInterests(selectedInterests)
                .then(() => {
                    this.$router.push(PATH.USER.SETTINGS);
                    mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS);
                });
        },
        back() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        selectedInterestsCallback() {
            return actionsHelper.requestUserInterests()
                .then(() => [...gettersHelper.selectedInterests()]);
        },
    },
};
</script>
