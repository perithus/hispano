document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initFaq();
  initContactForm();
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
