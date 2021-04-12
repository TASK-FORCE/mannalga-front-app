<template>
  <div class="wh-100 d-flex align-center justify-center">
    <div style="margin-bottom: 50%">
      <div>
        <v-img
          width="270"
          height="58"
          :src="require(isDarkTheme ? '@/images/logo-darkmode.png' : '@/images/logo.png')"
          class="mx-auto"
        />
      </div>
      <div class="description">
        취미 및 동호회 서비스 <b>만날까</b>에서
        <br>
        당신의 관심사를 등록하고 모임에 참여하세요!
      </div>
    </div>
    <div class="footer">
      <v-btn
        class="footer-btn"
        color="yellow"
        :loading="loading"
        depressed
        @click="login"
      >
        <div class="mr-auto">
          <v-icon
            v-text="'$chat'"
          />
        </div>
        <div class="mr-auto">
          카카오 로그인
        </div>
      </v-btn>
      <div class="footer-text">
        Task-force
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { moveToKakaoLoginPage } from '@/utils/kakao/kakao.ts';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
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
    code(): string | null {
      const code: string | (string | null)[] = this.$route.query.code;

      if (typeof code === 'string') {
        return code;
      }

      return null;
    },
    validationFail() {
      return !!this.$route.query.validationFail;
    },
    isDarkTheme(): boolean {
      return this.$store.state.ui.isDarkTheme;
    },
  },
  mounted() {
    if (this.validationFail) {
      this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.LOGIN_REQUIRE);
      return;
    }

    if (this.$route.redirectedFrom) {
      return;
    }

    if (this.code) {
      this.startLoading();
      this.$store.dispatch(AuthActionTypes.REQUEST_KAKAO_TOKEN_BY_CODE, this.code)
        .then((isRegistered: boolean) => (isRegistered ? this.$router.push(PATH.CLUB_LIST) : this.$router.push(PATH.REGISTER.PROFILE)))
        .finally(() => this.endLoading());
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

<style
  scoped
  lang="scss"
>

.description {
  font-size: 13px;
  text-align: center;
  color: #666666;
  margin-top: 16px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 30px;

  .footer-btn {
    max-width: 306px;
    height: 46px;
    color: #000000;
    width: 100%;
  }

  .footer-text {
    font-family: 'GmarketSansMedium', 'Noto Sans KR', 'Roboto', sans-serif !important;
    font-weight: bold;
    font-size: 13px;
    color: #000000;
    margin-top: 20px;
    letter-spacing: -0.03em;
  }
}

.theme--dark {
  .description {
    color: #9f9f9f;
  }

  .footer-text {
    color: #FFFFFF;
  }
}
</style>
