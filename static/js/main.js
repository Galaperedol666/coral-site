// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {
  // ===== Burger menu toggle =====
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  if (burger && nav) {
    nav.setAttribute("aria-hidden", String(!nav.classList.contains("active")));
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
      nav.setAttribute("aria-hidden", String(expanded));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  // ===== Smooth scroll for in-page anchors =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ===== Category card click-through =====
  document.querySelectorAll(".category-card").forEach((card) => {
    if (card.tagName && card.tagName.toLowerCase() === "a") return;
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => {
      const title = card.querySelector("h3")?.textContent?.trim();
      window.location.href = title
        ? `catalogue.html?category=${encodeURIComponent(title)}`
        : "catalogue.html";
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ===== Safe external links =====
  document
    .querySelectorAll('.floating-buttons a[target="_blank"]')
    .forEach((link) => link.setAttribute("rel", "noopener noreferrer"));

  // ===== Portfolio modals =====
  document.querySelectorAll("[data-gallery]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-gallery");
      const modal = document.getElementById(id);
      if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll('.modal[aria-hidden="false"]')
        .forEach((modal) => {
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
        });
    }
  });

  // ===== Slider inside modals =====
  document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelectorAll("img");
    if (!slides.length) return;
    let index = 0;
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    function showSlide(i) {
      slides.forEach((img, idx) => {
        img.style.display = idx === i ? "block" : "none";
      });
    }
    showSlide(index);

    if (prev) {
      prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
      });
    }
  });

  // ===== Scroll-to-top button =====
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // ===== Dynamic year in footer =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ===== Global price filter =====
window.filterByPrice = function () {
  const minInput = document.getElementById("minPrice");
  const maxInput = document.getElementById("maxPrice");
  const grid = document.getElementById("productGrid");
  if (!minInput || !maxInput || !grid) return;

  const min = parseInt(minInput.value) || 0;
  const max = parseInt(maxInput.value) || Infinity;

  grid.querySelectorAll(".product-card").forEach((card) => {
    const priceEl = card.querySelector(".product-price");
    if (!priceEl) {
      card.style.display = "none";
      return;
    }
    const price = parseInt(priceEl.textContent.replace(/\D/g, "")) || 0;
    card.style.display = price >= min && price <= max ? "block" : "none";
  });
};

// ===== Global price sort =====
window.sortByPrice = function () {
  const sortSelect = document.getElementById("sortPrice");
  const grid = document.getElementById("productGrid");
  if (!sortSelect || !grid) return;

  const sortOrder = sortSelect.value;
  const cards = Array.from(grid.querySelectorAll(".product-card"));

  cards.sort((a, b) => {
    const priceA = parseInt(
      a.querySelector(".product-price")?.textContent.replace(/\D/g, "") || 0
    );
    const priceB = parseInt(
      b.querySelector(".product-price")?.textContent.replace(/\D/g, "") || 0
    );
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  cards.forEach((card) => grid.appendChild(card));
};

// ===== Google Analytics (optional centralization) =====
(function () {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-9BVTJ058PS";
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-9BVTJ058PS");
})();
// Графік роботи
document.addEventListener("DOMContentLoaded", () => {
  const scheduleEl = document.getElementById("work-schedule");
  if (!scheduleEl) return;

  const baseTextEl = scheduleEl.querySelector(".base-text");
  const statusTextEl = scheduleEl.querySelector(".status-text");
  const toggleIcon = scheduleEl.querySelector(".toggle-icon");

  const workDays = [1, 2, 3, 4, 5, 6]; // Пн–Сб
  const openHour = 9;
  const closeHour = 18;

  async function getInternetTime() {
    try {
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/Europe/Kyiv"
      );
      const data = await res.json();
      return new Date(data.datetime);
    } catch {
      return new Date(); // fallback
    }
  }

  async function updateSchedule() {
    const now = await getInternetTime();
    const day = now.getDay(); // 0 = Нд
    const hour = now.getHours();
    const minutes = now.getMinutes();

    baseTextEl.textContent = `Пн–Сб: ${openHour}:00–${closeHour}:00 | Нд: вихідний`;

    let diff, h, m;

    if (workDays.includes(day) && hour >= openHour && hour < closeHour) {
      // Відкрито
      diff = closeHour * 60 - (hour * 60 + minutes);
      h = Math.floor(diff / 60);
      m = diff % 60;
      statusTextEl.textContent = `Відкрито ✅ (ще ${h} год ${m} хв)`;
      statusTextEl.className = "status-text open";
    } else if (workDays.includes(day) && hour < openHour) {
      // Ще не відкрито
      diff = openHour * 60 - (hour * 60 + minutes);
      h = Math.floor(diff / 60);
      m = diff % 60;
      statusTextEl.textContent = `Відкриється через ${h} год ${m} хв ⏳`;
      statusTextEl.className = "status-text closed";
    } else {
      // Закрито
      if (workDays.includes(day)) {
        diff = (24 - hour) * 60 - minutes + openHour * 60;
      } else {
        // неділя → понеділок 9:00
        diff = (24 - hour) * 60 - minutes + 24 * 60 + openHour * 60;
      }
      h = Math.floor(diff / 60);
      m = diff % 60;
      statusTextEl.textContent = `Зачинено ❌ (відкриється через ${h} год ${m} хв)`;
      statusTextEl.className = "status-text closed";
    }
  }

  // Оновлення щохвилини
  updateSchedule();
  setInterval(updateSchedule, 60000);

  // Автоматичне згортання при вузькому екрані
  function checkMobile() {
    scheduleEl.classList.toggle("collapsed", window.innerWidth < 768);
  }

  checkMobile();
  window.addEventListener("resize", checkMobile);

  // Клік по 🕒
  toggleIcon.addEventListener("click", () => {
    scheduleEl.classList.toggle("collapsed");
  });
});
