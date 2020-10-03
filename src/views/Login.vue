<template>
    <div>
        <div class="absolute-center">
            <v-img height="200"
                   src="../images/vue.png"
            />
            <div class="text-center my-10">
                <p class="display-1">서비스명 1</p>
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
import { moveToKakaoLoginPage } from '@/utils/kakao/utlls.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { MAIN_PATH, REGISTER_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        isAuth: () => gettersHelper.isAuth(),
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

        // TODO 백엔드에게 api 요청 후 변경 필요
        if (this.isAuth && false) {
            this.requestTemplateWithLoading(
                async () => {
                    const isRegistered = await actionsHelper.requestRegisterStatus(this.appToken);
                    isRegistered ? this.$router.push(MAIN_PATH) : this.$router.push(REGISTER_PATH.PROFILE_PATH);
                },
            );
        }

        if (this.code) {
            this.requestTemplateWithLoading(
                async () => {
                    try {
                        const isRegistered = await actionsHelper.requestKakaoTokenByCode(this.code);
                        isRegistered ? this.$router.push(MAIN_PATH) : this.$router.push(REGISTER_PATH.PROFILE_PATH);
                    } catch (e) {
                        mutationsHelper.openSnackBar(MESSAGE.LOGIN_FAIL);
                    }
                },
            );
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
        requestTemplateWithLoading(callback) {
            this.startLoading();
            callback().finally(() => this.endLoading());
        },
    },
};
</script>

<style scoped>

</style>
