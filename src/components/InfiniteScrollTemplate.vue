<template>
    <v-list v-show="!$store.state.common.loading"
            class="py-0"
            :class="`${name}-list-wrapper`"
    >
        <v-list-item-group v-if="withListGroup">
            <div :class="`${name}-list-sentinel`" />
            <div :class="`${name}-list-group`">
                <slot v-if="isRequesting || (pageElements && pageElements.length > 0)"
                      name="list-main"
                />
                <div v-else
                     class="empty"
                     :style="{height: `${calculateEmptyPageHeight()}px`}"
                >
                    <div class="my-auto">
                        <slot name="empty" />
                    </div>
                </div>
            </div>
        </v-list-item-group>
        <div v-else>
            <div :class="`${name}-list-sentinel`" />
            <div :class="`${name}-list-group`">
                <slot v-if="isRequesting || (pageElements && pageElements.length > 0)"
                      name="list-main"
                />
                <div v-else
                     class="empty"
                     :style="{height: `${calculateEmptyPageHeight()}px`}"
                >
                    <div class="my-auto">
                        <slot name="empty" />
                    </div>
                </div>
            </div>
        </div>
    </v-list>
</template>

<script lang="ts">
import _ from '@/utils/common/lodashWrapper.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'InfiniteScrollTemplate',
    props: {
        firstPageCallback: {
            type: Function,
            required: true,
        },
        nextPageCallback: {
            type: Function,
            required: true,
        },
        pageElements: {
            type: Array,
            default: () => [],
        },
        pageInfo: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        withListGroup: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            listWrapper: null,
            isRequesting: false,
        };
    },
    computed: {
        isLastPage() {
            return this.pageInfo.isLastPage;
        },
        isFirstPage() {
            return this.pageInfo.nextPage === 0;
        },
    },
    mounted() {
        this.listWrapper = document.querySelector(`.${this.name}-list-wrapper`);
        this.sentinel = document.querySelector(`.${this.name}-list-sentinel`);
        if (_.isEmpty(this.pageElements)) {
            this.requestFirstPage();
        } else {
            this.insertSentinel();
        }
        this.setInfiniteScrollObserver();
    },
    methods: {
        requestFirstPage() {
            this.requestPage(this.firstPageCallback);
        },
        setInfiniteScrollObserver() {
            const infiniteScrollCallback = entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target === this.sentinel && this.canRequest()) {
                        this.requestPage(this.nextPageCallback);
                    }
                });
            };
            const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
            observer.observe(this.sentinel);
        },
        insertSentinel() {
            if (this.listGroup === null) {
                this.listGroup = document.querySelector(`.${this.name}-list-group`);
            }
            this.listGroup.insertBefore(this.sentinel, this.listGroup.children[this.listGroup.children.length - 2]);
        },
        requestPage(callback) {
            this.startRequest();
            callback()
                .then(() => this.insertSentinel())
                .finally(() => this.endRequest());
        },
        startRequest() {
            this.isRequesting = true;
        },
        endRequest() {
            this.isRequesting = false;
        },
        canRequest() {
            return !this.isRequesting && !this.isLastPage && !this.isFirstPage;
        },
        calculateEmptyPageHeight() {
            let top = 0;
            if (this.listWrapper) {
                top = this.listWrapper.getBoundingClientRect().top;
            }
            return window.innerHeight - top;
        },
    },
});
</script>

<style scoped
       lang="scss"
>
.empty {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
}
</style>
