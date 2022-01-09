'use strict';

const display = document.getElementById('sc');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=oper]');
const totalnum = document.getElementById('sc');

let newNum = true;
let operator;
let numpending;
let actualNum;

const upDisplay = (num) => {
    if (newNum) {
        display.textContent = num;
        newNum = false;
    }else{
        if (totalnum.textContent.length <= 12) {
            display.textContent += num;        
        }
    }
};

const insertNum = (e) => upDisplay(e.target.textContent);

numbers.forEach(number => number.addEventListener('click', insertNum));

const pedingOper = () => operator !== undefined;

const calcPercent = (np) => {
    let oh = actualNum/100;
    if (operator === '*' || operator === '/') {
        return eval(`${np}${operator}${oh}`);
    }else{
        return eval(`${np}${operator}(${oh}*numpending)`);
    }
};

const calc = () => {
    actualNum = parseFloat(display.textContent);
    if (pedingOper()) {
        newNum = true;

        if (display.textContent.indexOf('%') !== -1){
            upDisplay(calcPercent(numpending));
            return;
        }

        upDisplay(eval(`${numpending}${operator}${actualNum}`));
    }

    if (numpending === undefined && display.textContent.indexOf('%') !== -1) {
        clearDisplay();
        upDisplay(actualNum / 100);
    }
};

const selectOp = (e) => {
    if (!newNum) {
        calc();
        operator = e.target.textContent;
        numpending = parseFloat(display.textContent);
        newNum = true;
    }
};

operators.forEach(operator => operator.addEventListener('click', selectOp));

const activateEqual = () => {
    calc();
    operator = undefined;
};
document.getElementById('equals').addEventListener('click', activateEqual);

const clearDisplay = () => display.textContent = '';

const clearCalc = () => {
    display.textContent = '';
    numpending = undefined;
    operator = undefined;
    newNum = true;
};
document.getElementById('clear').addEventListener('click', clearCalc);

const deleteLastNum = () => {
    display.textContent = display.textContent.slice(0, -1);
};
document.getElementById('del').addEventListener('click', deleteLastNum);

const invertNum = () => {
    newNum = true;
    display.textContent = display.textContent * -1;
};
document.getElementById('invert').addEventListener('click', invertNum);


const existsDec = () => display.textContent.indexOf('.') !== -1;

const existsNum = () => display.textContent.length > 0;

const insertDec = () => {
    if(!existsDec()) {
        existsNum() ? upDisplay('.') : upDisplay('0.');
    }
};
document.getElementById('decimal').addEventListener('click', insertDec);

const existsPer = () => display.textContent.indexOf('%') !== -1;

const insertPercent = () => {
    if(!existsPer()) {
        existsNum() ? upDisplay('%') : upDisplay('0.1%');
    }
};
document.getElementById('percent').addEventListener('click', insertPercent);


const keyboardMap = {
    '0': 'key0',
    '1': 'key1',
    '2': 'key2',
    '3': 'key3',
    '4': 'key4',
    '5': 'key5',
    '6': 'key6',
    '7': 'key7',
    '8': 'key8',
    '9': 'key9',
    ',': 'decimal',
    '+': 'operplus',
    '-': 'opermin',
    '*': 'opermult',
    '/': 'operdivide',
    'Enter': 'equals',
    'Backspace': 'del',
    'c': 'clear',
    '%': 'percent'
}

const keyboardMapper = (e) => {
    const key = e.key;
    if (keyboardMap[key]) {
        document.getElementById(keyboardMap[key]).click();
    }
};
document.addEventListener('keydown', keyboardMapper);