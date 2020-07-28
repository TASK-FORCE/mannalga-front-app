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

        <BaseSnackBar text='로그인이 필요합니다.'
                      :open="openSnackbar"
                      @close="openSnackbar = false"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { moveToKakaoLoginPage } from '../utils/kakao/utlls.js';
import BaseSnackBar from '../components/BaseSnackBar.vue';

export default {
    name: 'Login',
    components: { BaseSnackBar },
    data() {
        return {
            loading: false,
            openSnackbar: false,
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
            this.openSnackbar = true;
        }

        if (this.code) {
            this.startLoading();
            this.requestKakaoTokenByCode(this.code);
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
    },
};
</script>

<style scoped>

</style>
