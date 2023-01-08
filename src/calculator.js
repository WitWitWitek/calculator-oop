function convertOperationSymbol(passedValue) {
  switch (passedValue) {
    case '+':
      return 'add';
    case '-':
      return 'subtract';
    case 'x':
      return 'multiply';
    case '/':
      return 'divide';
    default:
      return passedValue;
  }
}

function assignNumberHandler(objectNumber, passedValue) {
  let number = objectNumber;
  if (passedValue === 'DEL') {
    number = String(number).slice(0, -1);
    return number;
  }
  if (number && passedValue === '.' && number.includes('.')) {
    return number;
  }
  if (passedValue === '-/+' && number) {
    number *= -1;
    return number;
  }
  if (passedValue === '-/+' && !number) {
    return number;
  }
  return number ? number + passedValue : passedValue;
}

// eslint-disable-next-line no-unused-vars
class Calculator {
  constructor() {
    this.number1 = '';
    this.number2 = '';
    this.operationSign = '';
    this.operationRender = () => `${this.number1} ${this.operationSign} ${this.number2}`;
  }

  add = () => this.number1 + this.number2;

  subtract = () => this.number1 - this.number2;

  multiply = () => this.number1 * this.number2;

  divide = () => {
    if (this.number2 === 0) {
      throw new Error('Second argument is equal 0.');
    }
    return this.number1 / this.number2;
  };

  static assignNumbers(number) {
    if (!this.operationSign) {
      Ui.renderResult('');
      this.number1 = assignNumberHandler(this.number1, number);
    } else {
      this.number2 = assignNumberHandler(this.number2, number);
    }
    Ui.renderResult(this.operationRender());
  }

  static assignOperationType(operation) {
    if (operation === 'RESET') {
      this.operationSign = '';
      this.number1 = '';
      this.number2 = '';
      Ui.renderResult('');
      return;
    }
    this.operationSign = operation;
    Ui.renderResult(this.operationRender());
  }

  static resultClickHandler() {
    if (!this.number1 || !this.number2) {
      return;
    }
    this.number1 = Number(this.number1);
    this.number2 = Number(this.number2);
    try {
      const operationName = convertOperationSymbol(this.operationSign);
      Ui.renderResult(`${this.operationRender()} = ${this[operationName]()}`);
    } catch (err) {
      Ui.renderResult('');
      Ui.renderResult(err.message);
    }
    this.operationSign = '';
    this.number1 = '';
    this.number2 = '';
  }
}
