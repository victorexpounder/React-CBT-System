// CalculatorComponent.js

import React, { useState } from 'react';
import './Calculator.scss';

const CalculatorComponent = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [currentOperator, setCurrentOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleButtonClick = (value) => {
    setDisplayValue(displayValue + value);
  };

  const handleOperatorClick = (operator) => {
    setPreviousValue(displayValue);
    setCurrentOperator(operator);
    setDisplayValue('');
  };

  const handleEqualsClick = () => {
    const prevValue = parseFloat(previousValue);
    const currentValue = parseFloat(displayValue);

    switch (currentOperator) {
      case '+':
        setDisplayValue(prevValue + currentValue);
        break;
      case '-':
        setDisplayValue(prevValue - currentValue);
        break;
      case '*':
        setDisplayValue(prevValue * currentValue);
        break;
      case '/':
        setDisplayValue(prevValue / currentValue);
        break;
      default:
        break;
    }

    setCurrentOperator('');
    setPreviousValue('');
  };

  const handleClearClick = () => {
    setDisplayValue('');
    setCurrentOperator('');
    setPreviousValue('');
  };

  return (
    <div className="calculator-container">
      <input type="text" className="display" value={displayValue} readOnly />
      <div className="buttons-container">
        <button className="button" onClick={() => handleButtonClick('7')}>
          7
        </button>
        <button className="button" onClick={() => handleButtonClick('8')}>
          8
        </button>
        <button className="button" onClick={() => handleButtonClick('9')}>
          9
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('/')}>
          /
        </button>
        <button className="button" onClick={() => handleButtonClick('4')}>
          4
        </button>
        <button className="button" onClick={() => handleButtonClick('5')}>
          5
        </button>
        <button className="button" onClick={() => handleButtonClick('6')}>
          6
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('*')}>
          *
        </button>
        <button className="button" onClick={() => handleButtonClick('1')}>
          1
        </button>
        <button className="button" onClick={() => handleButtonClick('2')}>
          2
        </button>
        <button className="button" onClick={() => handleButtonClick('3')}>
          3
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('-')}>
          -
        </button>
        <button className="button" onClick={() => handleButtonClick('0')}>
          0
        </button>
        <button className="button" onClick={() => handleButtonClick('.')}>
          .
        </button>
        <button className="button" onClick={handleClearClick}>
          C
        </button>
        <button className="button operator" onClick={() => handleOperatorClick('+')}>
          +
        </button>
        <button className="button equals" onClick={handleEqualsClick}>
          =
        </button>
      </div>
    </div>
  );
};

export default CalculatorComponent;
