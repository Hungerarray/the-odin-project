import "./nav.scss";
import home from "../pages/home";
import cat from "../pages/catalogue";
import about from "../pages/about";

export const onHome = new CustomEvent("onHome", {
  detail: home,
});
export const onCatalogue = new CustomEvent("onCatalogue", {
  detail: cat,
});
const onAbout = new CustomEvent("onAbout", {
  detail: about,
});

export const navEvents = document.createElement("div");
export const events = ["onHome", "onCatalogue", "onAbout"];

const divs = [];

export default function navigation() {
  const logo = document.createElement("span");
  logo.textContent = "LOGO";

  const ul = document.createElement("ul");
  const home = document.createElement("li");
  home.textContent = "home";
  home.addEventListener("click", homeHandler);
  home.classList.add("clicked");
  divs.push(home);

  const catalogue = document.createElement("li");
  catalogue.textContent = "catalogue";
  catalogue.addEventListener("click", catHandler);
  divs.push(catalogue);

  const about = document.createElement("li");
  about.textContent = "about";
  about.addEventListener("click", aboutHandler);
  divs.push(about);

  ul.appendChild(home);
  ul.appendChild(catalogue);
  ul.appendChild(about);

  const nav = document.createElement("nav");
  nav.appendChild(logo);
  nav.appendChild(ul);

  return nav;

  function homeHandler() {
    navEvents.dispatchEvent(onHome);
    switchClicked(home);
  }
  
  function catHandler() {
    navEvents.dispatchEvent(onCatalogue);
    switchClicked(catalogue);
  }
  
  function aboutHandler() {
    navEvents.dispatchEvent(onAbout);
    switchClicked(about)
  }
}



function switchClicked(div) {
  divs.forEach((div) => {
    div.classList.remove("clicked");
  })
  div.classList.add("clicked");
}
