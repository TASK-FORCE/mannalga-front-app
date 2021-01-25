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
const changeTheme = () => { isDarkTheme() ? localStorage.setItem(KEY, Theme.WHITE) : localStorage.setItem(KEY, Theme.DARK); };

const isDarkTheme = () => currentTheme() === Theme.DARK;
const loadCurrentTheme = () => (vuetify.framework.theme.dark = isDarkTheme());
const changeThemeAndLoad = () => {
    changeTheme();
    loadCurrentTheme();
};
export {
    vuetify,
    changeThemeAndLoad,
    isDarkTheme,
    loadCurrentTheme,
};
