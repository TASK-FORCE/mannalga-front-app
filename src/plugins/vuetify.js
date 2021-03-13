import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { ICONS } from '@/utils/common/constant/icons.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
        values: ICONS,
    },
    theme: {
        themes: {
            dark: {
            },
        },
    },
});

const Theme = { DARK: 'black', WHITE: 'white' };
const KEY = 'currentTheme';

const currentTheme = () => localStorage.getItem(KEY);
const changeTheme = () => { isDarkTheme() ? localStorage.setItem(KEY, Theme.WHITE) : localStorage.setItem(KEY, Theme.DARK); };

const isDarkTheme = () => currentTheme() !== Theme.WHITE;
const loadCurrentTheme = () => (vuetify.framework.theme.dark = isDarkTheme());
const changeThemeAndLoad = () => {
    changeTheme();
    loadCurrentTheme();
    mutationsHelper.setThemeStatus(isDarkTheme());
};
export {
    vuetify,
    changeThemeAndLoad,
    isDarkTheme,
    loadCurrentTheme,
};
