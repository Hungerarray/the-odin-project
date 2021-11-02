import "./footer.scss";
import "../../node_modules/@fortawesome/fontawesome-free/js/all";

export default function footer() {
	const github = document.createElement("a");
	github.href = "https://github.com/hungerarray";
  const githubLogo = document.createElement("i");
  githubLogo.classList.add("fab", "fa-github");
	github.appendChild(githubLogo);

  const span = document.createElement("span");
  span.textContent = "© Copyright 2021 Hungerarray ";
  const foot = document.createElement("footer");
  foot.appendChild(span);
  foot.appendChild(github);

  return foot;
}
