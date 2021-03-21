import Vue from 'vue';
import { MyStore } from '@/store/type/types';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        store?: MyStore;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $store: MyStore;
    }
}
