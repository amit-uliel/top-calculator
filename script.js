const OPERATORS = ['+','-','*','/'];
let num1 = '';
let num2 = '';
let operator = null;
let isNum1Turn = true;
let shouldReset = false;
let isResultDisplayed = false;
let hasDot = false;

const display = document.querySelector('.calculator__display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const dotButton = document.querySelector('.dot');

// add event listeners
numberButtons.forEach(button => button.addEventListener('click', numberClick));
operatorButtons.forEach(button => button.addEventListener('click', operatorClick));
equalsButton.addEventListener('click', equalsClick);
clearButton.addEventListener('click', clearClick);
dotButton.addEventListener('click', dotClick);

// keyboard support
document.addEventListener('keydown', e => {
    
    let key = e.key;

    if (key >= '0' && key <= '9') { // key number
        if (isResultDisplayed) {
            clearClick();
        }

        if (shouldReset) {
            display.textContent = '';
            shouldReset = !shouldReset;
        }

        if (isNum1Turn) {
            num1 += key;
            num1 = parseFloat(num1);
        } else {
            num2 += key;
            num2 = parseFloat(num2);
        }
        display.textContent += key;
    } else if (OPERATORS.includes(key)) { // key operator
        if (num1 === '') return;

        if (operator !== null) {
            equalsClick();
        }
        
        isResultDisplayed = false;
        operator = key;
        display.textContent = num1 + operator;
        shouldReset = true;
        isNum1Turn = false;
        hasDot = false;
    } else if (key === 'Enter' || key === '=') { // key equals
        equalsClick();
    } else if (key === 'c') { // key clear
        clearClick();
    } else if (key === '.') { // key dot
        if (!hasDot && isNum1Turn && num1 !== '') {
            num1 += key;
            hasDot = true;
        } else if (!hasDot && num2 !== '') {
            num2 += key;
            hasDot = true;
        } else {
            return;
        }
        display.textContent += key;
    }

    console.log(key);
});


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
    hasDot = false;
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
    hasDot = false;
}

function clearClick() {
    num1 = '';
    num2 = '';
    operator = null;
    display.textContent = '';
    isNum1Turn = true;
    shouldReset = false;
    isResultDisplayed = false;
    hasDot = false;
}

function dotClick(e) {
    let key = e.target.value;
    if (!hasDot && isNum1Turn && num1 !== '') {
        num1 += key;
        hasDot = true;
    } else if (!hasDot && num2 !== '') {
        num2 += key;
        hasDot = true;
    } else {
        return;
    }

    display.textContent += key;
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