const buttons = document.querySelectorAll(".button");
let pervDisplay = document.querySelector("#prev-history");
let currDisplay = document.querySelector("#curr-history");
let currOperator = "";
let inf = false;
let currDec = false;

buttons.forEach((button) => button.addEventListener("click", buttonHandler));

// event handler to add things to curr display
function buttonHandler(e) {
  const button = e.target.innerText;
  if (inf) return;
  else if (button.includes(".")) {
    return decButton(button);
  } else if (isNaN(button)) {
    actionButton(button);
  } else {
    numberButton(button);
  }
}

function decButton(dec) {
  if (currDec) return;
  currDisplay.innerText += dec;
  currDec = true;
}

function numberButton(number) {
  if (currDisplay.innerText.length >= 25) return;
  currDisplay.innerText += number;
}

function actionButton(action) {
  if (action.search(/[-+*/]/g) !== -1) {
    operateHandle(action);
  } else if (action.includes("DEL")) {
    if (currDisplay.innerText.length === 0) reset();
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
  } else if (action.includes("RESET")) {
    reset();
  } else {
    if (currOperator === "") return;
    const result = compute(currOperator);
    if (divBy0(result)) return;
    reset();
    currDisplay.innerText = `${result}`;
  }
}

function reset() {
  currDisplay.innerText = "";
  pervDisplay.innerText = "";
  currOperator = "";
  inf = false;
  currDec = false;
}

function operateHandle(operand) {
  const currLength = currDisplay.innerText.length;
  const prevLength = pervDisplay.innerText.length;

  if (currLength !== 0 && prevLength !== 0) {
    const result = compute(currOperator);
    if (divBy0(result)) return;

    currOperator = operand;
    currDisplay.innerText = "";
    pervDisplay.innerText = `${result} ${operand}`;
  } else if (currLength === 0 && prevLength !== 0) {
    // do nothing
    return;
  } else if (currLength === 0 && prevLength === 0) {
    if (operand.search(/[-+]/) !== -1) {
      currDisplay.innerText = operand;
    }
  } else {
    currOperator = operand;
    pervDisplay.innerText = `${currDisplay.innerText} ${operand}`;
    currDisplay.innerText = "";
  }
  currDec = false;
}

function divBy0(res) {
  if (res !== Infinity) return false;

  inf = true;
  pervDisplay.innerText = "";
  currDisplay.innerText = res;
  setTimeout(() => {
    reset();
  }, 1000);

  return true;
}

// ----------------------------------------------------- //
// ---------------- operator section begin ------------- //
// ----------------------------------------------------- //

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function div(num1, num2) {
  return num1 / num2;
}

function compute(operand) {
  const operations = {
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
  };

  let currNum = Number(currDisplay.innerText);
  let prevNum = Number(pervDisplay.innerText.slice(0, -1));
  currNum = isNaN(currNum) ? 0 : currNum;
  prevNum = isNaN(prevNum) ? 0 : prevNum;

  return operations[operand](prevNum, currNum);
}

// ----------------------------------------------------- //
// ---------------- operator section end --------------- //
// ----------------------------------------------------- //

// ----------------------------------------------------- //
// ---------------- keyboard section begin ------------- //
// ----------------------------------------------------- //

document.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
  console.log(keyInput);
  if (keyInput.search(/[0-9]/) !== -1) {
    numberButton(keyInput);
  } else if (keyInput.includes(".")) {
    decButton(keyInput);
  } else if (keyInput.search(/[-+*/]/) !== -1) {
    actionButton(keyInput);
  }

  let morphedInput = keyInput.replace(/Enter/, "=");
  if (morphedInput.includes("=")) actionButton(morphedInput);

  morphedInput = keyInput.replace(/Backspace|Delete/, "DEL");
  if (morphedInput.includes("DEL")) actionButton(morphedInput);
}

// ----------------------------------------------------- //
// ---------------- keyboard section end --------------- //
// ----------------------------------------------------- //
