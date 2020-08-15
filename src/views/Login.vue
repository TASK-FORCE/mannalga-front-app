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
import { mapActions, mapMutations } from 'vuex';
import { moveToKakaoLoginPage } from '@/utils/kakao/utlls.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        code() {
            return this.$route.query.code;
        },
        validationFail() {
            return !!this.$route.query.validationFail;
        },
    },
    created() {
        if (this.validationFail) {
            this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.LOGIN_REQUIRE));
        }
        if (this.code) {
            this.startLoading();
            this[REQUEST_KAKAO_TOKEN_BY_CODE](this.code)
                .then(isFirstIssue => (isFirstIssue ? this.$router.push(REGISTER.PROFILE_PATH) : this.$router.push(MAIN_PATH)))
                .catch(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.LOGIN_FAIL)))
                .finally(() => this.endLoading());
        }
    },
    methods: {
        ...mapActions(AUTH, [REQUEST_KAKAO_TOKEN_BY_CODE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
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

</style>
