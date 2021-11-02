import "./about.scss";

export default function About() {
	const abt = document.createElement("div");
	abt.classList.add("card");

	const title = document.createElement("h3");
  title.textContent = "title";
	title.classList.add("card-title");

  const data = document.createElement("p");
  data.textContent = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, ullam est? Sapiente, blanditiis a non sint maxime
	vel, nam nesciunt illum tenetur neque veniam perferendis itaque ut in illo atque?
	Dolores cum facilis sapiente vitae culpa illo iure consequuntur corporis aperiam, est molestias doloremque. Nostrum sit
	error officiis voluptates dolorem possimus quis ea illum veritatis voluptatem. Fuga pariatur tempora ipsum?
	Temporibus similique, iste nobis id explicabo illo autem exercitationem voluptatibus culpa magnam quibusdam laborum
	sapiente, voluptatum quam dolor? Error consequatur laboriosam perferendis nam repudiandae quia neque vel. Repudiandae,
	numquam nemo!
	Mollitia similique, dolore et consequatur nam voluptatibus placeat soluta repellendus distinctio fugit esse quia
	corrupti dignissimos veritatis ex? Quam ab voluptas numquam eius modi nemo quo at autem commodi dolorem.
	Dolorem officia culpa eum deserunt quo architecto iure repudiandae, deleniti accusamus consequuntur quasi, perspiciatis
	enim hic labore. Quo libero excepturi illo neque, accusantium veritatis rerum animi sint odit, amet ex!`;
	data.classList.add("card-data");

	abt.appendChild(title);
	abt.appendChild(data);

	return abt;
}