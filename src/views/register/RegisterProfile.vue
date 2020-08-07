<template>
    <div>
        <UserProfile />
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { getValidationFailText, ruleValidationSuccess } from '@/utils/validationUtils.js';
import { mapGetters, mapMutations } from 'vuex';
import { NAME_RULES } from '@/utils/constant/rules.js';
import { buildSnackBarOption } from '@/utils/commonUtils.js';

export default {
    name: 'RegistProfile',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        ...mapGetters('user', ['profile']),
    },
    methods: {
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            const { name } = this.profile;
            if (ruleValidationSuccess(name, NAME_RULES)) {
                this.$router.push('/register/location');
                return;
            }
            this.openSnackBar(buildSnackBarOption(getValidationFailText(name, NAME_RULES)));
        },
    },
};

</script>

<style scoped>
</style>
