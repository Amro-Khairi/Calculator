const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
const backspaceBtn = document.getElementById("backspace-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (_firstNumber, secondNumber) => secondNumber,
};

let firstValue = "";
let operatorValue = "";
let awaitingNextValue = false;

const sendNumberValue = (number) => {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, repalce it, if not, add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

const addDecimal = () => {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;

  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (firstValue === "") {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

// Reset all values, display
const resetAll = () => {
  calculatorDisplay.textContent = "0";
  firstValue = "";
  operatorValue = "";
  awaitingNextValue = false;
};

// Backspace functionality
const backspace = () => {
  if (string.length > 1) {
    calculatorDisplay.textContent = calculatorDisplay.textContent.slice(
      0,
      calculatorDisplay.textContent.length - 1
    );
  } else {
    calculatorDisplay.textContent = "0";
  }
  awaitingNextValue = false;
};

// Event Listeners
// 1. Clicks

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

clearBtn.addEventListener("click", resetAll);
backspaceBtn.addEventListener("click", backspace);

// 2. Keypress

document.body.addEventListener("keydown", (e) => {
  inputBtns.forEach((inputBtn, index, inputBtns) => {
    if (e.key === inputBtn.value) {
      inputBtn.click();
    }
    if (e.key === "Enter" && inputBtn.value === "=") {
      const equalBtn = inputBtns[index];
      equalBtn.click();
    }
  });

  if (e.key === "Delete") {
    clearBtn.click();
  }

  if (e.key === "Backspace") {
    backspaceBtn.click();
  }
});
