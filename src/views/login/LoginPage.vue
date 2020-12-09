<template>
    <v-container>
        <div class="login-wrapper">
            <!--            <v-img height="200"-->
            <!--                   src="../../images/vue.png"-->
            <!--            />-->
            <div class="text-center">
                <v-icon class="main-icon">mdi-account-group</v-icon>
            </div>
            <div class="text-center">
                <p class="display-1">모임서비스</p>
            </div>
            <div class="text-center mt-5">
                <v-btn class="mx-auto font-weight-bold black--text"
                       color="yellow"
                       :loading="loading"
                       @click="login"
                >
                    Kakao Login
                    <v-icon right>
                        mdi-facebook-messenger
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
import { moveToKakaoLoginPage } from '@/utils/auth/kakao/utlls.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

export default {
    name: 'LoginPage',
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        hasToken: () => gettersHelper.hasToken(),
        appToken: () => gettersHelper.appToken(),
        code() {
            return this.$route.query.code;
        },
        validationFail() {
            return !!this.$route.query.validationFail;
        },
    },
    created() {
        if (this.validationFail) {
            mutationsHelper.openSnackBar(MESSAGE.LOGIN_REQUIRE);
            return;
        }

        if (this.hasToken) {
            actionsHelper.requestCheckIsMember()
                .then(isMember => this.$router.push(isMember ? PATH.CLUB_LIST : PATH.REGISTER.PROFILE));
        }

        if (this.code) {
            this.startLoading();
            actionsHelper.requestKakaoTokenByCode(this.code)
                .then(isRegistered => (isRegistered ? this.$router.push(PATH.CLUB_LIST) : this.$router.push(PATH.REGISTER.PROFILE)))
                .finally(() => this.endLoading());
        }
    },
    methods: {
        login() {
            this.startLoading();
            moveToKakaoLoginPage();
        },
        startLoading() {
            this.loading = true;
        },
        endLoading() {
            this.loading = false;
        },
    },
};
</script>
<style scoped>
.login-wrapper {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -45%);
}

.main-icon {
    width: 200px !important;
    height: 200px !important;
    font-size: 200px !important;
}
</style>
