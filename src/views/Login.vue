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
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { moveToKakaoLoginPage } from '@/utils/kakao/utlls.js';
import { LOGIN_FAIL, LOGIN_REQUIRE } from '@/utils/constant/message.js';
import { buildSnackBarMessage } from '@/utils/commonUtils.js';

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
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
            this.openSnackBar(buildSnackBarMessage(LOGIN_REQUIRE));
        }
        if (this.code) {
            this.startLoading();
            this.requestKakaoToken();
        }
    },
    methods: {
        ...mapActions('auth', ['requestKakaoTokenByCode']),
        ...mapMutations('common', ['openSnackBar']),
        login() {
            this.startLoading();
            moveToKakaoLoginPage();
        },
        startLoading() {
            this.loading = true;
        },
        requestKakaoToken() {
            this.requestKakaoTokenByCode(this.code)
                .then(isFirstIssue => (isFirstIssue ? this.$router.push('/register/profile') : this.$router.push('/main')))
                .catch(() => this.openSnackBar(buildSnackBarMessage(LOGIN_FAIL)));
        },
    },
};
</script>

<style scoped>

</style>
