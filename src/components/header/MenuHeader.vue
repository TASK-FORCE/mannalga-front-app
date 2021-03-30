<template>
  <CommonHeader
    :title="title"
    @back="$emit('back')"
  >
    <template #option>
      <div v-if="menus.length > 0">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="menu-btn"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-text="'$dotsVertical'" />
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="menu in menus"
              :key="menu.text"
              @click="menu.click"
            >
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </CommonHeader>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue';
import CommonHeader from '@/components/header/CommonHeader.vue';
import { ClickWithText } from '@/interfaces/common';

export default Vue.extend({
  name: 'MenuHeader',
  components: { CommonHeader },
  props: {
    title: {
      type: String,
      required: true,
    },
    menus: {
      type: Array as PropType<ClickWithText[]>,
      default: () => [],
    }
  },
});
</script>

<style
  scoped
  lang="scss"
>
.menu-btn {
  color: #292929 !important;
}

.theme--dark {
  .menu-btn {
    color: #F5F5F5 !important;
  }
}
</style>
