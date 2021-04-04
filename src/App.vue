<template>
  <v-app>
    <v-main>
      <transition
        name="component-fade"
        mode="out-in"
      >
        <router-view
          :key="$route.fullPath"
          class="app-body"
        />
      </transition>
    </v-main>
    <Progress v-show="$store.state.ui.loading" />
    <CommonSnackBar />
    <v-btn
      v-if="isDevEnv"
      class="temp-btn"
      fab
      color="red"
      x-small
      @click="changeTheme"
    >
      <v-icon
        class="white--text"
        v-text="'$plus'"
      />
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import CommonSnackBar from '@/components/CommonSnackBar.vue';
import Progress from '@/components/Progress.vue';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';
import { loadCurrentTheme } from '@/utils/theme';
import { PATH } from '@/router/route_path_type';
import _ from '@/utils/common/lodashWrapper';

function isIEBrowser() {
  const agent = navigator.userAgent.toLowerCase();
  return (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf('msie') != -1);
}

export default Vue.extend({
  name: 'App',
  components: { CommonSnackBar, Progress },
  data() {
    return {
      isDevEnv: process.env.NODE_ENV !== 'production',
      resizeEventListener: null as any,
    };
  },
  mounted() {
    this.validateBrowser();
    this.addResizeEvent();
    loadCurrentTheme();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEventListener);
  },
  methods: {
    changeTheme() {
      this.$store.commit(UIMutationTypes.CHANGE_THEME);
    },
    validateBrowser() {
      if (isIEBrowser()) {
        if (this.$route.path !== PATH.NOT_SUPPORTED_BROWSER) {
          this.$router.push(PATH.NOT_SUPPORTED_BROWSER);
        }
      }
    },
    addResizeEvent() {
      this.resizeEventListener = _.throttle(() => this.$store.commit(UIMutationTypes.CHANGE_WIDTH, window.innerWidth), 500);
      window.addEventListener('resize', this.resizeEventListener);
    },
  },
});
</script>

<style>
.temp-btn {
  position: fixed;
  border-radius: 50%;
  min-width: auto !important;
  z-index: 4;
  right: 8px;
  bottom: 10%;
}
</style>
