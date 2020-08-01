<template>
    <div>
        <UserInterest v-show="!isLoading"/>
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarMessage, isEmpty } from '@/utils/commonUtils.js';
import { SERVER_INSTABILITY, SUCCESS_REGISTER } from '@/utils/constant/message.js';

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
        ...mapActions('common', ['startLoading', 'endLoading']),
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            const registerInfo = {
                profile: this.profile,
                selectedLocations: this.selectedLocations,
                selectedInterests: this.selectedInterests,
            };
            this.startLoading();
            this.postRegister(registerInfo)
                .then(() => {
                    this.endLoading();
                    return this.$router.push('/main')
                        .then(() => this.openSnackBar(buildSnackBarMessage(SUCCESS_REGISTER)));
                })
                .catch(() => {
                    this.endLoading();
                    return this.$router.push('/register')
                        .then(() => this.openSnackBar(buildSnackBarMessage(SERVER_INSTABILITY)));
                });
        },
    },
};
</script>

<style scoped>

</style>
