<template>
    <div>
        <div class="absolute-center">
            <v-img height="200"
                   src="../images/vue.png"
            />
            <div class="text-center"
                 style="margin-top: 3rem; margin-bottom: 3rem"
            >
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
import { mapActions, mapGetters } from 'vuex';
import { moveToKakaoLoginPage } from '../utils/kakao/utlls.js';

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapGetters('user', [
            'hasToken',
        ]),
        code() {
            return this.$route.query.code;
        },
    },
    created() {
        if (this.code) {
            this.loading = true;
            this.requestKakaoToken(this.code);
        }
    },
    methods: {
        ...mapActions('user', [
            'requestKakaoToken',
        ]),
        login() {
            this.loading = true;

            if (this.hasAppToken) {
                // TODO 메인 메뉴로 이동
                return;
            }

            if (this.hasKakaoToken) {
                // TODO App 토큰 발급
                return;
            }

            moveToKakaoLoginPage();
        },
    },
};
</script>

<style scoped>

</style>
