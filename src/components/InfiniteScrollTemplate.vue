<template>
    <v-list v-show="!isLoading"
            class="py-0"
    >
        <v-list-item-group>
            <div :class="`${name}-list-sentinel`" />
            <div :class="`${name}-list-group`">
                <slot v-if="isRequesting || (pageElements && pageElements.length > 0)"
                      name="list-main"
                />
                <slot v-else
                      name="fallback"
                />
            </div>
        </v-list-item-group>
    </v-list>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
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
    },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            searchFilterElement: null,
            isRequesting: false,
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        isLastPage() {
            return this.pageInfo.isLastPage;
        },
        isFirstPage() {
            return this.pageInfo.nextPage === 0;
        },
    },
    mounted() {
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
    },
};
</script>
