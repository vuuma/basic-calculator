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
    let secondNumber = Number(secondNumberArray.join(''));
    
    result.textContent = '';
    let calculateResult = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    result.appendChild(document.createTextNode(`${calculateResult}`));
    clearValues()
    operation.textContent = '';
    operation.appendChild(document.createTextNode(`${calculateResult}`));
    firstNumberArray.push(calculateResult);
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
const numberPattern = /^[0-9]$/;
const operatorPattern = /[+-/x]/;
const clearPattern = /C/;
const equalPattern = /=/;
let operator = '';
let firstNumberArray = [];
let secondNumberArray = [];
let firstNumber;
let secondNumber;


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

        else if(operatorPattern.test(button.textContent)){
            
            
            if(firstNumberArray.length == 0 && button.textContent == '-'){
                firstNumberArray.push(0);
                operation.appendChild(document.createTextNode(0)); 
            }
            
            else if(secondNumberArray.length > 0 && (operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x'))){
            displayResult();
            }

            else{
                firstNumber = Number(firstNumberArray.join(''));
                operation.textContent = '';
                operation.appendChild(document.createTextNode(`${firstNumber}`));
            }
    

            operator = button.textContent;
            operation.appendChild(document.createTextNode(`${button.textContent}`)); 
        }

        else if(equalPattern.test(button.textContent)){
            // Converts the Array of numbers into a single number. i.e. [1, 0, 9] becomes 109.
            displayResult()
        }

        // Clears the screen when the C (clear button) is pressed.
        else if(clearPattern.test(button.textContent)){
            clearAllData()
            clearValues()
        }
    }
    );
});
