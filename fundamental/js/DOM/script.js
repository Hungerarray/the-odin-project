const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";
container.appendChild(content);

const para = document.createElement("p");
para.style.cssText = "color: red;";
para.textContent = "Hey I'm red!";
container.appendChild(para);

const h3 = document.createElement("h3");
h3.style.cssText = "color: blue;";
h3.textContent = "I'm a blue h3!";
container.appendChild(h3);

const div = document.createElement("div");
div.style.cssText = "border: 1px solid black; background-color = pink;";
const h1 = document.createElement("h1");
h1.textContent = "I'm in a div!";
div.appendChild(h1);
const divPara = document.createElement("p");
divPara.textContent = "Me too!";
div.appendChild(divPara);
container.appendChild(div);

const btn = document.querySelector("#btn");
btn.onclick = () => alert("Hello World");

const btn1 = document.querySelector("#btn1");
btn1.addEventListener("click", (evnt) => {
  console.log(evnt);
  console.log(evnt.target);
  evnt.target.style.background = "blue";
  alert("Hello World");
});

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    alert(button.id);
  });
});
