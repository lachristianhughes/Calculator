let runningTotal = 0;
let buffer = "0";
let previousOperator = null; // Initialize previousOperator to null initially

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (!isNaN(value)) {
        handleNumber(value); // Call handleNumber for numeric inputs
    } else {
        handleSymbol(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'c':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1); // Use slice to remove the last character
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '−':
            runningTotal -= intBuffer; // Subtract intBuffer instead of adding it
            break;
        case '×':
            runningTotal *= intBuffer; // Multiply by intBuffer
            break;
        case '÷':
            runningTotal /= intBuffer; // Divide by intBuffer
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

init();
