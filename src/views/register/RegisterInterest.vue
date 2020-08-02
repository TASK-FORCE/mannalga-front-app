<template>
    <div>
        <UserInterest v-show="!isLoading" />
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarMessage } from '@/utils/commonUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';
import { isEmpty } from '@/utils/lodashUtils.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        ...mapGetters('user', ['profile', 'selectedLocations', 'selectedInterests']),
        ...mapGetters('common', ['isLoading']),
    },
    created() {
        if (isEmpty(this.profile)) {
            this.$router.push('/register/profile');
            return;
        }

        if (isEmpty(this.selectedLocations)) {
            this.$router.push('/register/location');
        }
    },
    methods: {
        ...mapActions('user', ['postRegister']),
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            const registerInfo = {
                profile: this.profile,
                selectedLocations: this.selectedLocations,
                selectedInterests: this.selectedInterests,
            };
            this.postRegister(registerInfo)
                .then(() => this.$router.push('/main')
                    .then(() => this.openSnackBar(buildSnackBarMessage(MESSAGE.SUCCESS_REGISTER))))
                .catch(() => this.$router.push('/register')
                    .then(() => this.openSnackBar(buildSnackBarMessage(MESSAGE.SERVER_INSTABILITY))));
        },
    },
};
</script>

<style scoped>

</style>
