import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { ICONS } from '@/utils/common/constant/icons.js';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
        values: ICONS,
    },
});

const Theme = { DARK: 'black', WHITE: 'white' };
const KEY = 'currentTheme';

const currentTheme = () => localStorage.getItem(KEY);
const changeTheme = () => { isCurrentThemeDark() ? localStorage.setItem(KEY, Theme.WHITE) : localStorage.setItem(KEY, Theme.DARK); };

const isCurrentThemeDark = () => currentTheme() === Theme.DARK;
const loadCurrentTheme = () => (vuetify.framework.theme.dark = isCurrentThemeDark());
const changeThemeAndLoad = () => {
    changeTheme();
    loadCurrentTheme();
};
export {
    vuetify,
    changeThemeAndLoad,
    isCurrentThemeDark,
    loadCurrentTheme,
};
