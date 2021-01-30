<template>
    <div v-if="!isLoading">
        <CommonHeader title="지역변경"
                      @click="moveToSettingPage"
        />
        <UserRegionSelectList :selectedRegions="selectedRegions"
                              @selectRegion="selectRegion"
        >
            <template #header>
                <div class="text-center mb-7"
                     style="margin-top: 40%"
                >
                    모임에 참여할 지역을 선택 해주세요. <br>
                    (원하는 지역은 <b>최대 3개</b> 선택 가능합니다)
                </div>
            </template>
            <template #footer>
                <SimpleBtnFooter text="변경하기"
                                 :loading="btnLoading"
                                 @click="changeRequest"
                />
            </template>
        </UserRegionSelectList>
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import UserRegionSelectList from '@/components/user/UserRegionSelectList.vue';
import CommonHeader from '@/components/header/CommonHeader.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import SimpleBtnFooter from '@/components/footer/SimpleBtnFooter.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'UserRegionEditPage',
    components: { SimpleBtnFooter, UserRegionSelectList, CommonHeader },
    data() {
        return {
            btnLoading: false,
            selectedRegions: {},
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        actionsHelper.requestUserRegions()
            .then(() => (this.selectedRegions = { ...gettersHelper.selectedRegions() }));
    },
    methods: {
        changeRequest() {
            this.btnLoading = true;
            actionsHelper.requestChangeUserRegions(this.selectedRegions)
                .then(() => {
                    mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CHANGE_REGIONS);
                    this.$router.push(PATH.USER.SETTINGS);
                })
                .finally(() => (this.btnLoading = false));
        },
        moveToSettingPage() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        selectRegion({ priority, region }) {
            this.$set(this.selectedRegions, priority, region);
        },
    },
};
</script>
