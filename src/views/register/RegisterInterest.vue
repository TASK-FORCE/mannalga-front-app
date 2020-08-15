<template>
    <div>
        <UserInterest v-show="!isLoading" />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';
import _ from '@/utils/lodashWrapper.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        ...mapGetters('user', ['profile', 'selectedLocationSeqs', 'selectedInterests']),
        ...mapGetters('common', ['isLoading']),
    },
    created() {
        if (_.isEmpty(this.profile)) {
            this.$router.push('/register/profile');
            return;
        }

        if (_.isEmpty(this.selectedLocationSeqs)) {
            this.$router.push('/register/location');
        }
    },
    methods: {
        ...mapActions('user', ['postRegister']),
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            const registerInfo = {
                profile: this.profile,
                selectedLocationSeqs: this.selectedLocationSeqs,
                selectedInterests: this.selectedInterests,
            };
            this.postRegister(registerInfo)
                .then(() => this.$router.push('/main')
                    .then(() => this.openSnackBar(buildSnackBarOption(MESSAGE.SUCCESS_REGISTER))))
                .catch(() => this.$router.push('/register/profile')
                    .then(() => this.openSnackBar(buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        },
    },
};
</script>

<style scoped>

</style>
