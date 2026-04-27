document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initFaq();
  initContactForm();
  initScrollExperience();
  initCookieBanner();
});

function initMenu() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll(".nav a");

  if (!toggle) {
    return;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("menu-open", toggle.checked);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false;
      document.body.classList.remove("menu-open");
    });
  });
}

function initFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
      return;
    }

    const answerId = `faq-answer-${index + 1}`;
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);
    answer.id = answerId;
    answer.hidden = true;

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      items.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }

        if (otherAnswer) {
          otherAnswer.hidden = true;
        }
      });

      button.setAttribute("aria-expanded", String(willOpen));
      answer.hidden = !willOpen;
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const successBox = document.querySelector("[data-form-success]");
  const errorBox = document.querySelector("[data-form-error]");
  const formTime = form.elements.namedItem("form_time");

  if (params.get("sent") === "1" && successBox) {
    successBox.hidden = false;
    form.hidden = true;
  }

  if (params.get("error") === "1" && errorBox) {
    errorBox.hidden = false;
  }

  if (formTime) {
    formTime.value = String(Math.floor(Date.now() / 1000));
  }

  const lang = document.documentElement.lang;
  const fields = {
    name: form.elements.namedItem("name"),
    email: form.elements.namedItem("email"),
    phone: form.elements.namedItem("phone"),
    level: form.elements.namedItem("level"),
    message: form.elements.namedItem("message")
  };

  const labels = lang === "es"
    ? {
        name: "Escribe tu nombre completo.",
        email: "Escribe un correo válido.",
        phone: "Escribe un número de teléfono válido.",
        level: "Selecciona el nivel o el objetivo del curso.",
        message: "El mensaje es demasiado largo (máximo 1000 caracteres)."
      }
    : {
        name: "Wpisz imię i nazwisko.",
        email: "Wpisz poprawny adres e-mail.",
        phone: "Wpisz poprawny numer telefonu.",
        level: "Wybierz poziom lub cel kursu.",
        message: "Wiadomość jest za długa (maksymalnie 1000 znaków)."
      };

  const clearError = (input) => {
    if (!input) {
      return;
    }

    input.classList.remove("error-input");
    const error = input.closest(".form-group")?.querySelector(".error");

    if (error) {
      error.textContent = "";
    }
  };

  const showError = (input, message) => {
    input.classList.add("error-input");
    const error = input.closest(".form-group")?.querySelector(".error");

    if (error) {
      error.textContent = message;
    }
  };

  Object.values(fields).forEach((field) => {
    field?.addEventListener("input", () => clearError(field));
    field?.addEventListener("change", () => clearError(field));
  });

  form.addEventListener("submit", (event) => {
    let hasError = false;

    Object.values(fields).forEach(clearError);

    if (fields.name && fields.name.value.trim().length < 3) {
      showError(fields.name, labels.name);
      hasError = true;
    }

    if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email.value.trim())) {
      showError(fields.email, labels.email);
      hasError = true;
    }

    if (fields.phone && !/^[0-9+\s]{8,}$/.test(fields.phone.value.trim())) {
      showError(fields.phone, labels.phone);
      hasError = true;
    }

    if (fields.level && !fields.level.value) {
      showError(fields.level, labels.level);
      hasError = true;
    }

    if (fields.message && fields.message.value.trim().length > 1000) {
      showError(fields.message, labels.message);
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
    }
  });
}

function initScrollExperience() {
  initScrollProgress();
  initRevealAnimations();
  initHeaderState();
  initSmoothHashLinks();
}

function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initRevealAnimations() {
  const selectors = [
    ".hub-card",
    ".hero-copy",
    ".hero-card",
    ".section-head",
    ".card",
    ".story-card",
    ".feature-panel",
    ".faq-item",
    ".contact-card",
    ".contact-form",
    ".policy-shell"
  ];

  const elements = document.querySelectorAll(selectors.join(", "));

  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });

  elements.forEach((element) => observer.observe(element));
}

function initHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initSmoothHashLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset = document.querySelector(".site-header")?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });
}

function initCookieBanner() {
  const storageKey = "viva-polaco-cookie-consent";

  if (localStorage.getItem(storageKey)) {
    return;
  }

  const lang = document.documentElement.lang === "es" ? "es" : "pl";
  const privacyHref = lang === "es" ? "./privacy-policy.html" : "./polityka-prywatnosci.html";
  const content = lang === "es"
    ? {
        text: "Usamos cookies para mejorar la experiencia, analizar el tráfico y recordar preferencias.",
        link: "Política de privacidad",
        accept: "Aceptar"
      }
    : {
        text: "Używamy cookies, aby poprawić działanie strony, analizować ruch i zapamiętywać preferencje.",
        link: "Polityka prywatności",
        accept: "Akceptuję"
      };

  const banner = document.createElement("aside");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <div class="cookie-banner__copy">
      <strong>Cookies</strong>
      <p>${content.text} <a href="${privacyHref}">${content.link}</a>.</p>
    </div>
    <button class="btn btn-primary cookie-banner__button" type="button">${content.accept}</button>
  `;

  const acceptButton = banner.querySelector(".cookie-banner__button");

  acceptButton?.addEventListener("click", () => {
    localStorage.setItem(storageKey, "accepted");
    banner.classList.add("is-hiding");

    window.setTimeout(() => {
      banner.remove();
    }, 260);
  });

  document.body.appendChild(banner);
}
