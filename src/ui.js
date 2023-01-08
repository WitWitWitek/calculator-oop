const resultRegExp = /=/i;
const numbersRegExp = /[0-9]|\.|del|(-\/\+)/i;
const operationsRegExp = /\+|-|\/|x|reset/i;

// eslint-disable-next-line no-unused-vars
class Ui {
  constructor() {
    this.app = document.querySelector('.app');
    this.buttons = [
      7, 8, 9, 'DEL',
      4, 5, 6, '+',
      1, 2, 3, '-',
      '.', 0, '/', 'x',
      'RESET', '=', '-/+',
    ];
  }

  renderCalculatorUi(numberHandlerCallback, operationCallback, resultHandler, themeHandler) {
    const calculatorContainer = document.createElement('div');
    calculatorContainer.classList.add('calculator-container');
    this.app.appendChild(calculatorContainer);

    const calculatorHeader = document.createElement('header');
    calculatorHeader.classList.add('calculator-header');
    calculatorContainer.appendChild(calculatorHeader);
    this.renderHeaderContent(themeHandler);

    const screen = document.createElement('div');
    screen.classList.add('calculator-screen');
    calculatorContainer.appendChild(screen);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('keypad');
    calculatorContainer.appendChild(buttonsContainer);

    for (const btn of this.buttons) {
      const button = document.createElement('button');
      button.addEventListener('click', (e) => {
        const choosenButtonValue = e.target.innerText;
        if (resultRegExp.test(choosenButtonValue)) {
          resultHandler();
        } else if (numbersRegExp.test(choosenButtonValue)) {
          numberHandlerCallback(choosenButtonValue);
        } else if (operationsRegExp.test(choosenButtonValue)) {
          operationCallback(choosenButtonValue);
        }
      });
      button.innerText = btn;
      button.classList.add('calculator-key');
      if (btn === '=') {
        button.classList.add('calculator-red-key');
      }
      if (btn === 'DEL' || btn === 'RESET') {
        button.classList.add('calculator-blue-key');
      }
      buttonsContainer.appendChild(button);
    }
  }

  static renderResult(result) {
    const resultParagraph = document.querySelector('.calculator-screen');
    resultParagraph.innerText = result.trim();
  }

  // eslint-disable-next-line class-methods-use-this
  renderHeaderContent(setThemeHandler) {
    const calculatorContainer = document.querySelector('.calculator-header');

    const calculatorH1 = document.createElement('h1');
    calculatorH1.innerText = 'calc';
    const themeWrapper = document.createElement('div');
    themeWrapper.classList.add('theme-wrapper');
    calculatorContainer.append(calculatorH1, themeWrapper);

    const themeTitle = document.createElement('h2');
    themeTitle.classList.add('theme-title');
    themeTitle.innerText = 'theme';

    const themeBody = document.createElement('div');
    themeBody.classList.add('theme-body');
    themeWrapper.append(themeTitle, themeBody);
    const themeLegend = document.createElement('div');
    themeLegend.classList.add('theme-legend');
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeBody.append(themeLegend, themeToggle);

    for (const num of [1, 2, 3]) {
      const legendParagraph = document.createElement('p');
      legendParagraph.innerText = num;
      themeLegend.appendChild(legendParagraph);
    }

    const themeInput = document.createElement('input');
    themeInput.setAttribute('type', 'range');
    themeInput.setAttribute('step', '1');
    themeInput.setAttribute('min', '1');
    themeInput.setAttribute('max', '3');
    const themeValue = localStorage.getItem('theme') || '3';
    themeInput.setAttribute('value', themeValue);
    themeToggle.appendChild(themeInput);
    themeInput.addEventListener('change', (e) => setThemeHandler(e.target.value));
  }
}
