import { vuetify } from '@/plugins/vuetify';

enum Theme {
  DARK = 'black',
  WHITE = 'white'
}

const KEY = 'currentTheme';

const currentTheme = (): Theme => {
  const theme = localStorage.getItem(KEY);
  if (theme) {
    return theme as Theme;
  }
  return Theme.WHITE;
}

const changeTheme = (): void => {
  isDarkTheme() ? localStorage.setItem(KEY, Theme.WHITE) : localStorage.setItem(KEY, Theme.DARK);
};


const setBodyTagStyle = (isDarkTheme: boolean) => {
  const bodyElement = document.querySelector('body') as HTMLBodyElement;
  bodyElement.style.backgroundColor = isDarkTheme ? '#121212' : '#FFFFFF';
};

export const isDarkTheme = (): boolean => currentTheme() !== Theme.WHITE;

export const loadCurrentTheme = (): void => {
  vuetify.framework.theme.dark = isDarkTheme();
  setBodyTagStyle(isDarkTheme());
}

export const changeThemeAndLoad = (): void => {
  changeTheme();
  loadCurrentTheme();
};
