function add(firstInteger, secondInteger){
    return firstInteger + secondInteger;
}

function subtract(firstInteger, secondInteger){
    return firstInteger - secondInteger;
}

function multiply(firstInteger, secondInteger){
    return firstInteger * secondInteger;
}

function divide(firstInteger, secondInteger){
    return firstInteger / secondInteger;
}


// The operate function takes in an operator sign and two integers and parses it 
// to the intended operation function (add, subtract, multiply, and divide).
function operate(operator, firstInteger, secondInteger){
    if(operator == "+"){
        return add(firstInteger, secondInteger);
    }

    else if(operator == "-"){
        return subtract(firstInteger, secondInteger);
    }

    else if(operator == "x"){
        return multiply(firstInteger, secondInteger);
    }

    else if(operator == "/"){
        return divide(firstInteger, secondInteger);
    }
}

function clearValues(){
    firstIntegerArray.length = 0;
    secondIntegerArray.length = 0;
    firstInteger = null;
    secondInteger = null;
}

function clearAllData(){
    operation.textContent = '';
    result.textContent = '';
    firstIntegerArray.length = 0;
    secondIntegerArray.length = 0;
    operator = '';
}

const buttons = document.querySelectorAll('button');
const operation = document.querySelector('.operation');
const result = document.querySelector('.result');
const integerPattern = /^[0-9]$/;
const operatorPattern = /[+-/x]/;
const clearPattern = /C/;
const equalPattern = /=/;
const decimalPattern = /./;
let operator = '';
let firstIntegerArray = [];
let secondIntegerArray = [];
let firstInteger;
let secondInteger;


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        
        if(integerPattern.test(button.textContent)){
            if(operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x')){
                operation.appendChild(document.createTextNode(`${button.textContent}`));
                secondIntegerArray.push(button.textContent);
            }

            else{
                firstIntegerArray.push(button.textContent);
                operation.appendChild(document.createTextNode(`${button.textContent}`));
            }
        }   

        else if(operatorPattern.test(button.textContent)){
            if(firstIntegerArray.length == 0 && button.textContent == '-'){
                firstIntegerArray.push(0);
                operation.appendChild(document.createTextNode(0)); 
            }
            
            else if(secondIntegerArray.length > 0 && (operation.textContent.includes('-') || operation.textContent.includes('+') || operation.textContent.includes('/') || operation.textContent.includes('x'))){
                firstInteger = Number(firstIntegerArray.join(''));
                secondInteger = Number(secondIntegerArray.join(''));
                result.textContent = '';
                let calculateResult = operate(operator, firstInteger, secondInteger);
                result.appendChild(document.createTextNode(`${calculateResult}`));
                clearValues()
                operation.textContent = '';
                operation.appendChild(document.createTextNode(`${calculateResult}`));
                firstIntegerArray.push(calculateResult);
                }

            operator = button.textContent;
            operation.appendChild(document.createTextNode(`${button.textContent}`)); 
        }

        else if(equalPattern.test(button.textContent)){
            operation.appendChild(document.createTextNode(`${button.textContent}`));

            if(secondIntegerArray == 0){
                secondIntegerArray = firstIntegerArray;
            }
            
            // Converts the Array of numbers into a single integer. i.e. [1, 0, 9] becomes 109.
            firstInteger = Number(firstIntegerArray.join(''));
            secondInteger = Number(secondIntegerArray.join(''));
            result.textContent = '';
            let calculateResult = operate(operator, parseInt(firstInteger), parseInt(secondInteger));
            result.appendChild(document.createTextNode(`${calculateResult}`));
            clearValues()
            operation.textContent = '';
            operation.appendChild(document.createTextNode(`${calculateResult}`));
            firstIntegerArray.push(calculateResult);         
        }

        else if(decimalPattern.test(button.textContent)){
            console.log("decimal");
        }

        // Clears the screen when the C (clear button) is pressed.
        else if(clearPattern.test(button.textContent)){
            clearAllData()
        }
    });
});
