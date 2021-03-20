import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { ICONS } from '@/utils/common/constant/icons.ts';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
        values: ICONS,
    },
    theme: {
        themes: {
            dark: {},
        },
    },
});
