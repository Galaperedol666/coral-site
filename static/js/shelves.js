let products = [];
let currentImages = [];
let currentIndex = 0;

// Підтягуємо JSON
fetch("../static/data/shelves.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    renderProducts(products);
  });

function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  list.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${item.images[0]}" alt="${item.name}">
        <div class="product-price">${item.price} грн</div>
      </div>
      <h3>${item.name}</h3>
      <button class="btn-accent" onclick="openModal(${i})">Детальніше</button>
    `;
    grid.appendChild(card);
  });
}

function openModal(index) {
  const item = products[index];
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
    "Варіанти кольорів: " + item.colors.join(", ");

  document.getElementById("productModal").style.display = "flex";
}

function updateModalImage() {
  document.getElementById("modalImg").src = currentImages[currentIndex];
}

// Клік по картинці → перемикання
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

function closeModal(event) {
  if (!event || event.target.id === "productModal") {
    document.getElementById("productModal").style.display = "none";
  }
}

// Функція для кнопки "Зв’язок з менеджером"
window.contactManager = function () {
  // відкриває Telegram у новій вкладці браузера
  window.open("https://t.me/+380956181806", "_blank");
};
// Zaebicshe
