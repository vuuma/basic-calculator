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

    else{
        return null;
    } 
}

function clearValues(){
    firstIntegerArray.length = 0;
    secondIntegerArray.length = 0;
}

function clearResults(){
    operation.textContent = '';
    result.textContent = '';
}

const buttons = document.querySelectorAll('button');
const operation = document.querySelector('.operation');
const result = document.querySelector('.result');
const integerPattern = /^[0-9]$/;
const operatorPattern = /[+-/x]/;
const clearPattern = /C/;
const equalPattern = /=/;
let operator = '';
let firstIntegerArray = [];
let secondIntegerArray = [];


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
            operator = button.textContent;
            operation.appendChild(document.createTextNode(`${button.textContent}`)); 
        }

        else if(equalPattern.test(button.textContent)){
            // Converts the Array of numbers into a single integer. i.e. [1, 0, 9] becomes 109.
            let firstInteger = Number(firstIntegerArray.join(''));
            let secondInteger = Number(secondIntegerArray.join(''));
          
            result.textContent = '';
            let calculateResult = operate(operator, parseInt(firstInteger), parseInt(secondInteger));
            result.appendChild(document.createTextNode(`${calculateResult}`));
            clearValues()
            operation.textContent = '';
            operation.appendChild(document.createTextNode(`${calculateResult}`));
            firstIntegerArray.push(calculateResult);
        }

        // Clears the screen when the C (clear button) is pressed.
        else if(clearPattern.test(button.textContent)){
            clearResults()
            clearValues()
        }
    });
});
