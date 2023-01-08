// eslint-disable-next-line no-unused-vars
class Theme {
  static getThemeFromLocalStorage() {
    const localStorageTheme = localStorage.getItem('theme');
    this.setTheme(!localStorageTheme ? '' : localStorageTheme);
  }

  static setTheme(themeNumber) {
    const appElement = document.querySelector('.app');
    let themeToAdd;
    switch (themeNumber) {
      case '3':
        themeToAdd = 'theme-3';
        break;
      case '2':
        themeToAdd = 'theme-2';
        break;
      default:
        themeToAdd = 'theme-1';
        break;
    }
    if (appElement.classList.length === 1) {
      appElement.classList.add(themeToAdd);
    } else {
      const themeToRemove = appElement.classList[1];
      appElement.classList.replace(themeToRemove, themeToAdd);
    }
    localStorage.setItem('theme', themeNumber);
  }
}
