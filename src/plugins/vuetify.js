import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({});

const Theme = { DARK: 'black', WHITE: 'white' };
const KEY = 'currentTheme';

const currentVuetifyTheme = () => localStorage.getItem(KEY);
const isVuetifyThemeDark = () => currentVuetifyTheme() === Theme.DARK;
const loadCurrentTheme = () => (vuetify.framework.theme.dark = isVuetifyThemeDark());
const changeVuetifyTheme = () => {
    const currentTheme = currentVuetifyTheme();
    if (currentTheme === Theme.DARK) {
        localStorage.setItem(KEY, Theme.WHITE);
    } else {
        localStorage.setItem(KEY, Theme.DARK);
    }
    loadCurrentTheme();
};

export {
    vuetify,
    changeVuetifyTheme,
    isVuetifyThemeDark,
    loadCurrentTheme,
};
