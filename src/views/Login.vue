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
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { APP_TOKEN, AUTH, IS_AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';
import { REQUEST_REGISTER_STATUS, USER } from '@/store/type/user_type.js';

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapGetters(AUTH, [IS_AUTH, APP_TOKEN]),
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
            return;
        }

        if (this[IS_AUTH] && false) {
            this.requestTemplateWithLoading(
                async () => {
                    const isRegistered = await this[REQUEST_REGISTER_STATUS](this[APP_TOKEN]);
                    isRegistered ? this.$router.push(MAIN_PATH) : this.$router.push(REGISTER.PROFILE_PATH);
                },
            );
        }

        if (this.code) {
            this.requestTemplateWithLoading(
                async () => {
                    try {
                        const isRegistered = await this[REQUEST_KAKAO_TOKEN_BY_CODE](this.code);
                        isRegistered ? this.$router.push(MAIN_PATH) : this.$router.push(REGISTER.PROFILE_PATH);
                    } catch (e) {
                        this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.LOGIN_FAIL));
                    }
                },
            );
        }
    },
    methods: {
        ...mapActions(AUTH, [REQUEST_KAKAO_TOKEN_BY_CODE]),
        ...mapActions(USER, [REQUEST_REGISTER_STATUS]),
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
        requestTemplateWithLoading(callback) {
            this.startLoading();
            callback().finally(() => this.endLoading());
        },
    },
};
</script>

<style scoped>

</style>
