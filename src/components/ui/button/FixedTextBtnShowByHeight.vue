<template>
    <transition name="scroll-to-top">
        <v-btn v-if="active"
               class="create-btn v-btn--fab darken-2 white--text"
               :color="color || 'green'"
               @click="$emit('click')"
        >
            {{ text }}
        </v-btn>
    </transition>
</template>

<script>
import _ from '@/utils/lodashWrapper.js';

const DEFAULT_THROTTLE_DELAY = 300;

// props로 내려오는 heightBoundaryToShow를 넘어갈 때에만 FixedBtn을 보여준다.
export default {
    name: 'FixedTextBtnShowByHeight',
    props: {
        color: String,
        text: String,
        heightBoundaryToShow: {
            type: Number,
            required: true,
        },
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
        handleScroll() {
            this.active = window.pageYOffset > this.heightBoundaryToShow;
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
    right: 16px;
    bottom: 25px;
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
