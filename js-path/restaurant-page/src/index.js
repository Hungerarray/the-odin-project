import "./index.scss";
import nav, { navEvents, events } from "./components/nav";
import foot from "./components/footer";
import home from "./pages/home";

const header = document.createElement("header");
header.appendChild(nav());

const content = document.createElement("div");
content.id = "content";
content.appendChild(home());
events.forEach(function assignEvent(evnt) {
  navEvents.addEventListener(evnt, pageHandler);
});

const footer = foot();

document.body.appendChild(header);
document.body.appendChild(content);
document.body.appendChild(footer);

function pageHandler(evnt) {
  content.textContent = "";
  content.appendChild(evnt.detail());
}
