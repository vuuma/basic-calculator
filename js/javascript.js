function add(firstNumber, secondNumber){
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber){
    return firstNumber / secondNumber;
}

// The operate function takes in an operator sign and two numbers and parses it 
// to the intended operation function (add, subtract, multiply, and divide).
function operate(operator, firstNumber, secondNumber){
    if(operator == "+"){
        return add(firstNumber, secondNumber);
    }

    else if(operator == "-"){
        return subtract(firstNumber, secondNumber);
    }

    else if(operator == "x"){
        return multiply(firstNumber, secondNumber);
    }

    else if(operator == "/"){
        return divide(firstNumber, secondNumber);
    }
}

function displayResult(){
    let firstNumber = Number(firstNumberArray.join(''));

    if(secondNumberArray.length == 0){
        result.textContent = '';
        result.appendChild(document.createTextNode(`${firstNumber}`));
        
    }
    else{
        let secondNumber = Number(secondNumberArray.join(''));
        let calculateResult = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));

        result.textContent = '';
        result.appendChild(document.createTextNode(`${calculateResult}`));
        clearValues()
        operation.textContent = '';
        operation.appendChild(document.createTextNode(`${calculateResult}`));
        firstNumberArray.push(calculateResult);
    }
}

function clearValues(){
    firstNumberArray.length = 0;
    secondNumberArray.length = 0;
    firstNumber = null;
    secondNumber = null;
}

function clearAllData(){
    operation.textContent = '';
    result.textContent = '';
    firstNumberArray.length = 0;
    secondNumberArray.length = 0;
    operator = '';
}

const buttons = document.querySelectorAll('button');
const operation = document.querySelector('.operation');
const result = document.querySelector('.result');
const backspace = document.querySelector('.backspace');
const numberPattern = /^[0-9]$/;
const operatorPattern = /[+-/x]/;
const backspacePattern = /</;
const clearPattern = /C/;
const equalPattern = /=/;
const decimalPattern = /\./;
let operator = '';
let firstNumberArray = [];
let secondNumberArray = [];
let firstNumber;
let secondNumber;
let displayFirstNumber;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(numberPattern.test(button.textContent)){
            if(operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x')){
                operation.appendChild(document.createTextNode(`${button.textContent}`));
                secondNumberArray.push(button.textContent);
            }

            else{
                firstNumberArray.push(button.textContent);
                operation.appendChild(document.createTextNode(`${button.textContent}`));
            }
        }   

        else if(decimalPattern.test(button.textContent)){
            if(!firstNumberArray.includes(".") && secondNumberArray.length == 0){
                firstNumberArray.push(button.textContent);
                operation.appendChild(document.createTextNode(`${button.textContent}`));
            }

            else if(!secondNumberArray.includes(".")){
                secondNumberArray.push(button.textContent);
                operation.appendChild(document.createTextNode(`${button.textContent}`));
            }
        }

        else if(operatorPattern.test(button.textContent)){
            if(firstNumberArray.length == 0 && button.textContent == '-'){
                firstNumberArray.push(0);
                operation.appendChild(document.createTextNode(0)); 
            }
            
            else if(secondNumberArray.length > 0 && (operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x'))){
                displayResult();
            }

            if(operation.lastChild.textContent != '+' &&  operation.lastChild.textContent != '-' && operation.lastChild.textContent != '/' && operation.lastChild.textContent != 'x'){
                operator = button.textContent;
                operation.appendChild(document.createTextNode(`${button.textContent}`)); 
            }
        }

        

        else if(equalPattern.test(button.textContent)){
            // Converts the Array of numbers into a single number. i.e. [1, 0, 9] becomes 109.
            displayResult()
        }

        else if(backspacePattern.test(button.textContent)){
            if(secondNumberArray.length > 0 && (operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x'))){
                secondNumberArray.pop();
                operation.removeChild(operation.lastChild);     
            }

            else if(secondNumberArray.length == 0 && operator == ''){
                
                firstNumberArray.pop();
                operation.removeChild(operation.lastChild);  
            }
            
            else if(operation.lastChild.textContent == '+' || operation.lastChild.textContent == '-' || operation.lastChild.textContent == '/' || operation.lastChild.textContent == 'x'){
                operator = '';
                operation.removeChild(operation.lastChild);  
            }
        }
      
        // Clears the screen when the C (clear button) is pressed.
        else if(clearPattern.test(button.textContent)){
            clearAllData()
            clearValues()
        }
    }
    );
});
