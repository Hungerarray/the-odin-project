import "./catalogue.scss";

const snackList = [
  "pancit canton",
  "french fries",
  "hotdog sandwich",
  "fried siomai",
  "cheesestick",
  "burger",
  "cheese burger",
  "ham sandwich",
  "egg sandwich",
];
const dessertList = ["crema de fruta", "leche plan", "gelatin"];
const drinksList = ["c2", "soda", "hot coffee", "ice cold coffee"];

export default function Catalogue() {
  const cat = document.createElement("div");
  cat.id = "menu";

  const title = document.createElement("h3");
  title.textContent = "Menu";
	title.id = "menu-title";
  cat.appendChild(title);

  const subTitle = document.createElement("p");
  subTitle.textContent = "Snack and dessert";
	subTitle.id = "menu-subtitle";
  cat.appendChild(subTitle);
	
	const snack = makeList("snack", snackList);
	cat.appendChild(snack);

	const dessert = makeList("dessert", dessertList);
	cat.appendChild(dessert);

	const drink = makeList("drinks", drinksList);
	cat.appendChild(drink);

	const img1 = document.createElement("img");
	img1.src = "https://i2.wp.com/worthstart.com/wp-content/uploads/2021/07/Fast-Food-Restaurant-Names-Ideas.jpg?w=640&ssl=1";
	img1.id = "menu-image1";
	cat.appendChild(img1);

	const img2 = document.createElement("img");
	img2.src = "https://image.freepik.com/free-photo/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food_2829-6193.jpg";
	img2.id = "menu-image2";
	cat.appendChild(img2);
	

  return cat;
}

function makeList(title, items) {
	const container = document.createElement("div");
	container.classList.add("menu-list");
	container.id = `menu-${title}`;

	const lstTitle = document.createElement("span");
	lstTitle.textContent = title;
	lstTitle.classList.add("menu-list-title");
	container.appendChild(lstTitle);

	const lst = document.createElement("ul");
	lst.classList.add("menu-list-items");
	items.forEach(function addItem(item) {
		const lstItem = document.createElement("li");
		lstItem.textContent = item;
		lstItem.classList.add("menu-list-item");
		lst.appendChild(lstItem);
	})
	container.appendChild(lst);

	return container;
}