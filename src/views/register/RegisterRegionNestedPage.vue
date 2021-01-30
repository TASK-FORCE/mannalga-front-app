<template>
    <div>
        <UserRegionSelectList :selectedRegions="selectedRegions"
                              @selectRegion="selectRegion"
        >
            <template v-slot:footer>
                <GoBackBtnFooter v-slot
                                 @clickGoBtn="clickGoBtn"
                />
            </template>
        </UserRegionSelectList>
    </div>
</template>

<script>
import UserRegionSelectList from '@/components/user/UserRegionSelectList.vue';
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import _ from '@/utils/common/lodashWrapper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'RegisterRegionNestedPage',
    components: { UserRegionSelectList, GoBackBtnFooter },
    data() {
        return {
            selectedRegions: {},
        };
    },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
        }
    },
    methods: {
        clickGoBtn() {
            if (_.isEmpty(this.selectedRegions)) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_REGION_REQUIRE);
            } else {
                mutationsHelper.setSelectedRegions(this.selectedRegions);
                this.$router.push(PATH.REGISTER.INTEREST);
            }
        },
        selectRegion({ priority, region }) {
            this.$set(this.selectedRegions, priority, region);
        },
    },
};
</script>

<style scoped>

</style>
