let products = [];
let viewList = []; // ← список, який реально показується
let currentImages = [];
let currentIndex = 0;

// Підтягуємо JSON
fetch("../static/data/shelves.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    viewList = [...products]; // ← копія
    renderProducts(viewList);
    updateCount(viewList.length);
  });

// Оновлення лічильника
function updateCount(n) {
  document.getElementById("productCount").textContent = n;
}

// Рендер карток
function renderProducts(list) {
  viewList = list; // ← оновлюємо глобальний список
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  list.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${item.images[0]}" alt="${item.name}">
        <div class="product-price">${item.price}</div>
      </div>
      <h3>${item.name}</h3>
      <button class="btn-accent" onclick="openModal(${i})">Детальніше</button>
    `;
    grid.appendChild(card);
  });
}

// Відкриття модалки
function openModal(index) {
  const item = viewList[index]; // ← тепер завжди правильний товар
  if (!item) return;

  currentImages = item.images;
  currentIndex = 0;

  updateModalImage();

  document.getElementById("modalName").textContent = item.name;
  document.getElementById("modalDesc").innerHTML = item.desc
    .split("\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  document.getElementById("modalSpecs").innerHTML = item.specs
    .map((s) => `<li>${s}</li>`)
    .join("");

  document.getElementById("modalColors").innerHTML =
    item.colors && item.colors.length
      ? "Варіанти кольорів: " + item.colors.join(", ")
      : "";

  document.getElementById("productModal").style.display = "flex";
}

// Оновлення картинки в модалці
function updateModalImage() {
  document.getElementById("modalImg").src = currentImages[currentIndex];
}

// Перемикання картинок
document.getElementById("modalImg").addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  if (e.clientX < rect.left + rect.width / 2) {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
  } else {
    currentIndex = (currentIndex + 1) % currentImages.length;
  }
  updateModalImage();
});

// Закриття модалки
function closeModal(event) {
  if (!event || event.target.id === "productModal") {
    document.getElementById("productModal").style.display = "none";
  }
}

// Сортування по алфавіту
function sortByName() {
  const type = document.getElementById("sortName").value;

  viewList.sort((a, b) => {
    if (type === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  renderProducts(viewList);
  updateCount(viewList.length);
}

// Сортування за ціною
function sortByPrice() {
  const type = document.getElementById("sortPrice").value;

  const getPrice = (item) =>
    parseInt(String(item.price).replace(/\s/g, "").replace(/[^\d]/g, ""), 10);

  viewList.sort((a, b) => {
    const pa = getPrice(a);
    const pb = getPrice(b);

    if (type === "asc") return pa - pb;
    return pb - pa;
  });

  renderProducts(viewList);
  updateCount(viewList.length);
}

// Глобальний пошук
function searchGlobal() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(q),
  );

  renderProducts(filtered);
  updateCount(filtered.length);
}

// Кнопка менеджера
window.contactManager = function () {
  window.open("https://t.me/+380956181806", "_blank");
};
