<template>
    <div>
        <UserProfile v-show="!isLoading"
                     :profile="this.profile"
        />
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserProfile from '@/components/UserProfile.vue';
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { ruleValidationSuccess } from '@/utils/validationUtils.js';
import { NAME_RULES } from '@/utils/constant/rules.js';

export default {
    name: 'RegistProfile',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        ...mapGetters('user', ['profile', 'profileIsEmpty']),
        ...mapGetters('common', ['isLoading']),
    },
    created() {
        if (this.profileIsEmpty) {
            this.startLoading();
            this.requestProfile()
                .then(() => this.endLoading())
                .catch(() => this.$router.push('/login'));
        }
    },
    methods: {
        ...mapActions('user', ['requestProfile']),
        ...mapActions('common', ['startLoading', 'endLoading']),
        clickGoBtn() {
            if (ruleValidationSuccess(this.profile.name, NAME_RULES)) {
                this.$router.push('/register/location');
            }
            // 스낵바 -> getValidationFailText
        },
    },
};

</script>

<style scoped>
</style>
