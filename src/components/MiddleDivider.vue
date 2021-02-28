<template>
    <div class="divider"
         :style="{'height': `${height}px`}"
    />
</template>

<script>
import { isDarkTheme } from '@/plugins/vuetify.js';

export default {
    name: 'MiddleDivider',
    props: {
        height: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            isDarkTheme: isDarkTheme(),
        };
    },
};
</script>

<style scoped
      lang="scss"
>
.divider {
  background-color: #F5F5F5;
}

.theme--dark {
  .divider {
    background-color: #292929;
  }
}
</style>
