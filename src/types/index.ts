import Vue, { VueConstructor } from 'vue';

export type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;
