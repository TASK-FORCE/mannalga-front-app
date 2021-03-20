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

<script lang="ts">
import { moveToKakaoLoginPage } from '@/utils/kakao/kakao.ts';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';
import { AuthActionTypes, UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'LoginPage',
    data() {
        return {
            loading: false,
            PATH,
        };
    },
    computed: {
        code(): string {
            return this.$route.query.code;
        },
        validationFail() {
            return !!this.$route.query.validationFail;
        },
    },
    created() {
        if (this.validationFail) {
            this.$store.commit(CommonMutationTypes.OPEN_SNACK_BAR, MESSAGE.LOGIN_REQUIRE);
            return;
        }

        if (this.$store.getters.hasToken) {
            if (localStorage.getItem('backdoor') === 'true') {
                localStorage.removeItem('appToken');
                localStorage.removeItem('backdoor');
            } else {
                this.$store.dispatch(UserActionTypes.REQUEST_CHECK_IS_MEMBER)
                    .then(isMember => this.$router.push(isMember ? PATH.CLUB_LIST : PATH.REGISTER.PROFILE));
            }
        }

        if (this.code) {
            this.startLoading();
            this.$store.dispatch(AuthActionTypes.REQUEST_KAKAO_TOKEN_BY_CODE, this.code)
                .then((isRegistered: boolean) => (isRegistered ? this.$router.push(PATH.CLUB_LIST) : this.$router.push(PATH.REGISTER.PROFILE)))
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
});
</script>
<style scoped>
.login-wrapper {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -45%);
}
</style>
