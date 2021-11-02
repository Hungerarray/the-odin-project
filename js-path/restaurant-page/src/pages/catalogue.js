import "./catalogue.scss";
import burger from "../../assets/burger.jpg";
import desert from "../../assets/desert.jpg";

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

  const img1 = new Image();
  img1.src = burger;
  img1.id = "menu-image1";
  cat.appendChild(img1);

  const img2 = new Image();
  img2.src = desert;
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
  });
  container.appendChild(lst);

  return container;
}
