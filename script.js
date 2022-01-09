'use strict';

const display = document.getElementById('sc');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=oper]');

const upDisplay = (num) => {
    display.textContent += num;
};

const insertNum = (e) => upDisplay(e.target.textContent);

numbers.forEach(number => number.addEventListener('click', insertNum));

operators.forEach(operator => operator.addEventListener('click', selectOp));