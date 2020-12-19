<template>
    <div class="meeting-middle-spacer"
         :class="isThemeDark ? 'dark-bg' :'white-bg'"
         :style="{'height': `${height}px`}"
    />
</template>

<script>
import { isCurrentThemeDark } from '@/plugins/vuetify.js';

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
            isThemeDark: isCurrentThemeDark(),
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
