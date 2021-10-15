let color = "#000";
const canvas = document.querySelector("#canvas");
let grid = false;

init();

function makeCanvas(elements) {
  canvas.innerHTML = "";
  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;
  const elemWidth = canvasWidth / elements;
  const elemHeight = canvasHeight / elements;
  canvas.style.cssText = `display: grid; grid-template-columns: repeat(${elements}, 1fr); `;

  for (let i = 0; i < elements ** 2; ++i) {
    const newElem = document.createElement("div");
    newElem.clientWidth = elemWidth;
    newElem.clientHeight = elemHeight;
    newElem.classList.add("pixel");
    if(grid)
      newElem.style.cssText = "border: 1px solid rgba(0, 0, 0, 0.5);";
    canvas.appendChild(newElem);
  }
}

function colorDiv(e) {
  const div = e.target;
  div.style.backgroundColor = color;
}

function clearCanvas() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => (pixel.style.backgroundColor = "#fff"));
}

function gridToggle (e) {
  grid = !grid;
  const pixels = document.querySelectorAll(".pixel");
  if (grid) {
    pixels.forEach((pixel) => pixel.style.cssText += "border: 1px solid rgba(0, 0, 0, 0.5);");
    e.target.classList.add("clicked");
  } else {
    pixels.forEach((pixel) => pixel.style.border = "");
    e.target.classList.remove("clicked");
  }
}

function displayGrid() {
  const pixels = document.querySelectorAll(".pixel");
}

function init() {
  makeCanvas(16);
  
  canvas.addEventListener("mousedown", () => {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => pixel.addEventListener("mouseenter", colorDiv));
  });
  
  canvas.addEventListener("mouseup", () => {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) =>
    pixel.removeEventListener("mouseenter", colorDiv)
    );
  });
  
  const clear = document.querySelector("#clear");
  clear.addEventListener("click", clearCanvas);
  
  const gridLines = document.querySelector("#grid-lines");
  gridLines.addEventListener('click', gridToggle);
  
  const sliderValue = document.querySelector("#slider-value");
  const slider = document.querySelector("#slider");
  sliderValue.innerText = slider.value;
  slider.addEventListener('input', () => {
    makeCanvas(slider.value);
    sliderValue.innerText = slider.value;
  }
  );

  const colorPicker = document.querySelector("#color");
  colorPicker.addEventListener('input', (e) => color = e.target.value);
}
