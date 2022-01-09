'use strict';

const display = document.getElementById('sc');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=oper]');

let newNum = true;
let operator;
let numpending;

const upDisplay = (num) => {
    if (newNum) {
        display.textContent = num;
        newNum = false;
    }else{
        display.textContent += num;        
    }
};

const insertNum = (e) => upDisplay(e.target.textContent);

numbers.forEach(number => number.addEventListener('click', insertNum));

const pedingOper = () => operator !== undefined;

const calc = () => {
    if (pedingOper()) {
        const actualNum = parseFloat(display.textContent);
        newNum = true;
        switch (operator) {
            case '+': upDisplay(numpending + actualNum);
            break;

            case '-': upDisplay(numpending - actualNum);
            break;

            case '*': upDisplay(numpending * actualNum);
            break;

            case '/': upDisplay(numpending / actualNum);
            break;
        }
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
    console.log(display.textContent);
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