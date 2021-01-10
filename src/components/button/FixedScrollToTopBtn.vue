<template>
    <transition name="scroll-to-top">
        <v-btn v-if="active"
               class="create-btn v-btn--fab darken-2"
               :color="color || 'green'"
               @click="scrollToTop"
        >
            <v-icon class="white--text"
                    v-text="'$chevronUp'"
            />
        </v-btn>
    </transition>
</template>

<script>
import _ from '@/utils/common/lodashWrapper.js';
import { ScrollHelper } from '@/utils/scroll.js';

const DEFAULT_THROTTLE_DELAY = 300;
const DEFAULT_BOUNDARY = 100;

export default {
    name: 'FixedScrollToTopBtn',
    props: {
        color: String,
    },
    data() {
        return {
            active: false,
            handleScrollEvent: null,
        };
    },
    created() {
        this.handleScrollEvent = _.throttle(this.handleScroll, DEFAULT_THROTTLE_DELAY);
        window.addEventListener('scroll', this.handleScrollEvent);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScrollEvent);
    },
    methods: {
        scrollToTop() {
            ScrollHelper.scrollToTop();
        },
        handleScroll() {
            this.active = window.pageYOffset > DEFAULT_BOUNDARY;
        },
    },
};
</script>

<style scoped>
.create-btn {
    position: fixed;
    border-radius: 50%;
    width: 50px !important;
    height: 50px !important;
    min-width: auto !important;
    z-index: 4;
    left: 16px;
    bottom: 10px;
}

.scroll-to-top-enter-active {
    transition: all .5s ease;
}

.scroll-to-top-leave-active {
    transition: all .5s ease-out;
}

.scroll-to-top-enter, .scroll-to-top-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>
