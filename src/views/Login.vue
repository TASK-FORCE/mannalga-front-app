<template>
    <div>
        <div class="absolute-center">
            <v-img height="200"
                   src="../images/vue.png"
            />
            <div class="text-center my-10">
                <p class="display-1">서비스명</p>
            </div>
            <div class="text-center">
                <v-btn class="mx-auto font-weight-bold"
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

        <BaseSnackBar :message='snackBarMessage'
                      :open="snackBarOpen"
                      @close="snackBarOpen = false"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { moveToKakaoLoginPage } from '@/utils/kakao/utlls.js';
import BaseSnackBar from '@/components/BaseSnackBar.vue';
import { LOGIN_FAIL, LOGIN_REQUIRE } from '@/utils/constant/message.js';

export default {
    name: 'Login',
    components: { BaseSnackBar },
    data() {
        return {
            loading: false,
            snackBarOpen: false,
            snackBarMessage: LOGIN_REQUIRE,
        };
    },
    computed: {
        ...mapGetters('auth', ['isAuth']),
        code() {
            return this.$route.query.code;
        },
        validationFail() {
            return !!this.$route.query.validationFail;
        },
    },
    created() {
        if (this.validationFail) {
            this.snackBarOpen = true;
        }

        if (this.code) {
            this.startLoading();
            this.requestKakaoToken();
        }
    },
    methods: {
        ...mapActions('auth', [
            'requestKakaoTokenByCode',
        ]),
        login() {
            this.startLoading();
            moveToKakaoLoginPage();
        },
        startLoading() {
            this.loading = true;
        },
        requestKakaoToken() {
            this.requestKakaoTokenByCode(this.code)
                .then(isFirstIssue => (isFirstIssue ? this.$router.push('/register') : this.$router.push('/main')))
                .catch(() => this.triggerSnackbar(LOGIN_FAIL));
        },
        triggerSnackbar(message) {
            this.snackBarMessage = message;
            this.snackBarOpen = true;
        },
    },
};
</script>

<style scoped>

</style>
