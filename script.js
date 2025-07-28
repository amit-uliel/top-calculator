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
const deleteButton = document.querySelector('.delete');

// add event listeners
numberButtons.forEach(button => button.addEventListener('click', numberClick));
operatorButtons.forEach(button => button.addEventListener('click', operatorClick));
equalsButton.addEventListener('click', equalsClick);
clearButton.addEventListener('click', clearClick);
dotButton.addEventListener('click', dotClick);
deleteButton.addEventListener('click', deleteClick);

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
        dotClick();
    } else if (key === 'Backspace') { // backspace
        deleteClick();
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

function dotClick() {
    let key = '.';
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

function deleteClick() {
    if (isNum1Turn && num1 !== '') {
        num1 = num1.toString();
        let deletedChar = num1.charAt(num1.length - 1);
        num1 = num1.slice(0, -1);
        num1 = num1 === '' ? '' : parseFloat(num1);

        if (deletedChar === '.') {
            hasDot = false;
        }
        display.textContent = display.textContent.slice(0,-1);
    } else if (num2 !== '') {
        num2 = num2.toString();
        let deletedChar = num2.charAt(num2.length - 1);
        num2 = num2.slice(0, -1);
        num2 = num2 === '' ? '' : parseFloat(num2);

        if (deletedChar === '.') {
            hasDot = false;
        }
        display.textContent = display.textContent.slice(0,-1);
    }
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