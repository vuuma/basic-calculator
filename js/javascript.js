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

    else if(operator == "*"){
        return multiply(firstInteger, secondInteger);
    }

    else if(operator == "/"){
        return divide(firstInteger, secondInteger);
    }

    else{
        return null;
    } 
}