import lightTheme from './light'
import darkTheme from './dark'
export const themeEnum = {
  light: 'light',
  dark: 'dark'
}



const themeMap = {
  [themeEnum.light]: lightTheme,
  [themeEnum.dark]: darkTheme
};

export function getThemeByName(theme) {
  return themeMap[theme];
}