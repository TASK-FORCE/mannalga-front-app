<template>
    <v-container>
        <div class="login-wrapper">
            <!--            <v-img height="200"-->
            <!--                   src="../../images/vue.png"-->
            <!--            />-->
            <div class="text-center">
                <v-icon
                    size="200"
                    v-text="'$threePeople'"
                />
            </div>
            <div class="text-center">
                <p class="display-1">모임서비스</p>
            </div>
            <div class="text-center mt-5">
                <v-btn
                    class="mx-auto font-weight-bold black--text"
                    color="yellow"
                    :loading="loading"
                    @click="login"
                >
                    Kakao Login
                    <v-icon
                        right
                        v-text="'$facebookMessenger'"
                    />
                </v-btn>
            </div>
            <div class="text-center mt-5">
                <v-btn
                    class="mx-auto font-weight-bold black--text"
                    color="green"
                    :loading="loading"
                    @click="$router.push(PATH.BACKDOOR_LOGIN)"
                >
                    Backdoor Login
                    <v-icon
                        right
                        v-text="'$facebookMessenger'"
                    />
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script>
import { moveToKakaoLoginPage } from '@/utils/kakao/kakao.js';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'LoginPage',
    data() {
        return {
            loading: false,
            PATH,
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
            if (localStorage.getItem('backdoor') === 'true') {
                localStorage.removeItem('appToken');
                localStorage.removeItem('backdoor');
            } else {
                actionsHelper.requestCheckIsMember()
                    .then(isMember => this.$router.push(isMember ? PATH.CLUB_LIST : PATH.REGISTER.PROFILE));
            }
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
</style>
