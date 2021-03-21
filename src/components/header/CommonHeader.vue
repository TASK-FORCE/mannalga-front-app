<template>
  <v-app-bar
    class="elevation-0 app-header"
    height="60px"
    :app="!isDialog"
  >
    <v-btn
      icon
      @click="$emit('back')"
    >
      <v-icon
        class="font-weight-bold"
        v-text="'$back'"
      />
    </v-btn>
    <span
      v-if="title"
      class="header-title"
    >
            {{ title }}
        </span>
    <v-spacer />
    <v-btn
      v-if="showSubmitBtn"
      text
      class="header-button"
      @click="$emit('submit')"
    >
      완료
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'CommonHeader',
  props: {
    title: String,
    showSubmitBtn: {
      type: Boolean,
      default: false,
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.app-header {
  border-bottom: 1px solid #F5F5F5;
}

.header-title {
  color: #292929;
  font-weight: bold;
  font-size: 18px;
}

.header-button {
  color: #292929;
  font-weight: 500;
  font-size: 18px;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.theme--dark {
  .app-header {
    border-bottom: 1px solid #292929;
  }

  .header-title {
    color: #F5F5F5;
  }

  .header-button {
    color: #F5F5F5;
  }
}
</style>
