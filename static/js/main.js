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
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // ===== Dynamic year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  // ===== Idle bubbles =====
  const bubbleContainer = document.getElementById("bubbles");
  if (bubbleContainer) {
    function spawnBubble() {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.setProperty("--rand", Math.random());
      bubbleContainer.appendChild(bubble);
      setTimeout(() => bubble.remove(), 6000);
    }
    setInterval(spawnBubble, 1500);
  }

  // ===== Cursor bubbles =====
  document.addEventListener("mousemove", (e) => {
    const bubble = document.createElement("div");
    bubble.className = "cursor-bubble";
    bubble.style.left = e.pageX + "px";
    bubble.style.top = e.pageY + "px";
    bubble.style.width = Math.random() * 8 + 4 + "px";
    bubble.style.height = bubble.style.width;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1000);
  });
  javascript;
});
// ===== Графік роботи (Виправлено) =====
const updateSchedule = async () => {
  const scheduleEl = document.getElementById("work-schedule");
  if (!scheduleEl) return;

  const baseTextEl = scheduleEl.querySelector(".base-text");
  const statusTextEl = scheduleEl.querySelector(".status-text");

  const workDays = [1, 2, 3, 4, 5, 6]; // Пн–Сб
  const openHour = 9;
  const closeHour = 18;

  // Отримання часу
  let now;
  try {
    const res = await fetch("https://worldtimeapi.org");
    const data = await res.json();
    now = new Date(data.datetime);
  } catch (e) {
    now = new Date(); // Fallback на локальний час, якщо API лежить
  }

  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (baseTextEl) {
    baseTextEl.textContent = `Пн–Сб: ${openHour}:00–${closeHour}:00 | Нд: вихідний`;
  }

  let diff, h, m;
  const currentTotalMinutes = hour * 60 + minutes;
  const openTotalMinutes = openHour * 60;
  const closeTotalMinutes = closeHour * 60;

  if (workDays.includes(day) && hour >= openHour && hour < closeHour) {
    // ВІДКРИТО
    diff = closeTotalMinutes - currentTotalMinutes;
    h = Math.floor(diff / 60);
    m = diff % 60;
    statusTextEl.textContent = `Відкрито ✅ (ще ${h} год ${m} хв)`;
    statusTextEl.className = "status-text open";
  } else {
    // ЗАКРИТО
    if (workDays.includes(day) && hour < openHour) {
      diff = openTotalMinutes - currentTotalMinutes;
    } else {
      // Розрахунок до відкриття наступного дня
      diff = 1440 - currentTotalMinutes + openTotalMinutes;
      if (day === 6 || day === 0) {
        // Субота вечір або Неділя
        let daysToWait = day === 6 ? 1 : 0;
        diff += daysToWait * 1440;
      }
    }
    h = Math.floor(diff / 60);
    m = diff % 60;
    statusTextEl.textContent = `Зачинено ❌ (відкриється через ${h} год ${m} хв)`;
    statusTextEl.className = "status-text closed";
  }
};

// Запуск при завантаженні
document.addEventListener("DOMContentLoaded", () => {
  updateSchedule();
  setInterval(updateSchedule, 60000); // Оновлення щохвилини

  const scheduleEl = document.getElementById("work-schedule");
  if (scheduleEl) {
    // Логіка згортання
    const toggleIcon = scheduleEl.querySelector(".toggle-icon");
    const checkMobile = () =>
      scheduleEl.classList.toggle("collapsed", window.innerWidth < 768);

    window.addEventListener("resize", checkMobile);
    checkMobile();

    if (toggleIcon) {
      toggleIcon.addEventListener("click", () =>
        scheduleEl.classList.toggle("collapsed"),
      );
    }
  }
});
