class App {
  static render() {
    const appUi = new Ui();
    const calculatiorApp = new Calculator();
    appUi.renderCalculatorUi(
      Calculator.assignNumbers.bind(calculatiorApp),
      Calculator.assignOperationType.bind(calculatiorApp),
      Calculator.resultClickHandler.bind(calculatiorApp),
      Theme.setTheme,
    );
    Theme.getThemeFromLocalStorage();
  }
}

App.render();
