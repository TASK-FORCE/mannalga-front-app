<template>
  <v-list
    v-show="!$store.state.ui.loading"
    class="py-0"
    :class="`${name}-list-wrapper`"
  >
    <v-list-item-group v-if="withListGroup">
      <div :class="`${name}-list-sentinel`" />
      <div :class="`${name}-list-group`">
        <slot
          v-if="isRequesting || (pageElements && pageElements.length > 0)"
          name="list-main"
        />
        <div v-else>
          <div
            v-if="!hideEmptyPage"
            class="empty"
            :style="{height: `${emptyPageHeight}px`}"
          >
            <div class="my-auto">
              <slot name="empty" />
            </div>
          </div>
        </div>
      </div>
    </v-list-item-group>
    <div v-else>
      <div :class="`${name}-list-sentinel`" />
      <div :class="`${name}-list-group`">
        <slot
          v-if="isRequesting || (pageElements && pageElements.length > 0)"
          name="list-main"
        />
        <div v-else>
          <div
            v-if="!hideEmptyPage"
            class="empty"
            :style="{height: `${emptyPageHeight}px`}"
          >
            <div class="my-auto">
              <slot name="empty" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import _ from '@/utils/common/lodashWrapper.ts';
import Vue, { PropType } from 'vue';
import { Page } from '@/interfaces/common';

export default Vue.extend({
  name: 'InfiniteScrollTemplate',
  props: {
    firstPageCallback: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    nextPageCallback: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    pageElements: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    pageInfo: {
      type: Object as PropType<Page>,
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
    callFirstPage: {
      type: Boolean,
      default: true,
    },
    hideEmptyPage: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      sentinel: undefined as undefined | HTMLElement,
      listGroup: undefined as undefined | HTMLElement,
      listWrapper: undefined as undefined | HTMLElement,
      isRequesting: false as boolean,
      emptyPageHeight: 0 as number,
      resizeEventListener: null as any,
    };
  },
  computed: {
    isLastPage(): boolean {
      return this.pageInfo.isLastPage;
    },
    isFirstPage(): boolean {
      return this.pageInfo.nextPage === 0;
    },
  },
  mounted() {
    this.listWrapper = document.querySelector(`.${this.name}-list-wrapper`) as HTMLElement;
    this.sentinel = document.querySelector(`.${this.name}-list-sentinel`) as HTMLElement;
    this.listGroup = document.querySelector(`.${this.name}-list-group`) as HTMLElement;
    if (_.isEmpty(this.pageElements) && this.callFirstPage) {
      this.requestFirstPage();
    } else {
      this.insertSentinel();
    }
    this.setInfiniteScrollObserver();
    this.adjustEmptyPageHeight();
    this.resizeEventListener = _.throttle(this.adjustEmptyPageHeight, 500);
    window.addEventListener('resize', this.resizeEventListener);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEventListener);
  },
  methods: {
    requestFirstPage() {
      this.requestPage(this.firstPageCallback);
    },
    setInfiniteScrollObserver() {
      const infiniteScrollCallback: IntersectionObserverCallback =
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.target === this.sentinel && this.canRequest()) {
              this.requestPage(this.nextPageCallback);
            }
          });
        };
      const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
      observer.observe(this.sentinel as HTMLElement);
    },
    insertSentinel() {
      if (!this.listGroup) {
        this.listGroup = document.querySelector(`.${this.name}-list-group`) as HTMLElement;
      }
      this.listGroup.insertBefore(this.sentinel as HTMLElement, this.listGroup.children[this.listGroup.children.length - 2]);
    },
    requestPage(callback: () => Promise<any>) {
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
    adjustEmptyPageHeight() {
      this.emptyPageHeight = this.calculateEmptyPageHeight();
    },
    calculateEmptyPageHeight() {
      let top = 0;
      if (this.listGroup) {
        top = this.listGroup.getBoundingClientRect().top;
      }
      return window.innerHeight - top;
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.empty {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
</style>
