let num1 = '';
let num2 = '';
let operator = null;
let isNum1Turn = true;
let shouldReset = false;
let isResultDisplayed = false;

const display = document.querySelector('.calculator__display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

// add event listeners
numberButtons.forEach(button => button.addEventListener('click', numberClick));
operatorButtons.forEach(button => button.addEventListener('click', operatorClick));
equalsButton.addEventListener('click', equalsClick);
clearButton.addEventListener('click', clearClick);

// click handlers
function numberClick(e) {
    if (isResultDisplayed) {
        clearClick();
    }

    if (shouldReset) {
        display.textContent = '';
        shouldReset = !shouldReset;
    }

    if (isNum1Turn) {
        display.textContent += e.target.value;
        num1 = parseFloat(display.textContent);
    } else {
        display.textContent += e.target.value;
        num2 = parseFloat(display.textContent);
    }
}

function operatorClick(e) {

    if (num1 === '') return;

    if (operator !== null) {
        equalsClick();
    }
    
    isResultDisplayed = false;
    operator = e.target.value;
    display.textContent = num1 + operator;
    shouldReset = true;
    isNum1Turn = false;
}

function equalsClick() {
    if (num1 === '' || num2 === '') {
        return; 
    }

    const result = operate(num1, num2, operator);
    num1 = result;
    num2 = '';
    operator = null;
    shouldReset = true;
    display.textContent = result;
    isResultDisplayed = true;
    return result;
}

function clearClick() {
    num1 = '';
    num2 = '';
    operator = null;
    display.textContent = '';
    isNum1Turn = true;
    shouldReset = false;
    isResultDisplayed = false;
}

// math functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'ERROR';
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}