<template>
    <div :class="isDarkTheme ? 'dark-bg' :'white-bg'"
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

<style scoped>
.white-bg {
    background-color: #eeeded;
}

.dark-bg {
    background-color: #3c3b3b;
}

</style>
