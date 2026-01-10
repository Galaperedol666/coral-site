// ===== Burger menu toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
    });

    // Close nav on link click (mobile UX)
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

  // ===== Category card click-through to catalogue with filter hint =====
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3")?.textContent?.trim();
      if (title) {
        window.location.href = `catalogue.html?category=${encodeURIComponent(
          title
        )}`;
      } else {
        window.location.href = "catalogue.html";
      }
    });
  });

  // ===== Keyboard accessibility for category cards =====
  document.querySelectorAll(".category-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ===== Safe external links (messengers) open in new tab =====
  document
    .querySelectorAll('.floating-buttons a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });
});

// ===== Global price filter (matches HTML: onclick="filterByPrice()") =====
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
// Відкрити модалку (портфоліо), слайдери та scroll-to-top після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  // Відкрити модалку (портфоліо)
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

  // Закрити при кліку по бекдропу (поза .modal-content)
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.documentElement.style.overflow = "";
      }
    });
  });

  // Додатково: закрити по Esc (доступність)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll('.modal[aria-hidden="false"]')
        .forEach((modal) => {
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
        });
      document.documentElement.style.overflow = "";
    }
  });

  // Слайдер для кожної модалки (портфоліо)
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
      if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
