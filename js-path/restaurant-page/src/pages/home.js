import "./home.scss";

export default function Home() {
  const home = document.createElement("div");
  home.id = "home";

	const title = document.createElement("h2");
	title.textContent = "Welcome to Generic Cuisine";
	title.classList.add("home-title");
	home.appendChild(title);


	const text = document.createElement("p");
	text.textContent = "Remember us for finest cuisine";
	text.classList.add("home-text");
	home.appendChild(text);
  
  return home;
}
