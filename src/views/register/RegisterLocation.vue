<template>
    <div>
        <UserLocation />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { mapGetters, mapMutations } from 'vuex';
import UserLocation from '@/components/UserLocation.vue';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/message.js';

export default {
    name: 'RegisterLocation',
    components: { UserLocation, GoBackBtnFooter },
    data() {
        return {
            selectedTemplateIds: [],
            test: false,
        };
    },
    computed: {
        ...mapGetters('user', ['profile', 'selectedLocationSeqs']),
    },
    created() {
        if (_.isEmpty(this.profile)) {
            this.$router.push('/register/profile');
        }
    },
    methods: {
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            if (_.isNotEmpty(this.selectedLocationSeqs)) {
                this.$router.push('/register/interest');
                return;
            }
            this.openSnackBar(buildSnackBarOption(MESSAGE.SELECT_LOCATION_REQUIRE));
        },
    },
};
</script>

<style scoped>

</style>
