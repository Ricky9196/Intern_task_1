
// Wait until DOM loads
document.addEventListener("DOMContentLoaded", function () {

  const darkModeBtn = document.getElementById("darkModeToggle");

  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    darkModeBtn.textContent = "☀️ Light Mode";
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    darkModeBtn.textContent = "🌙 Dark Mode";
  }

  // Check saved preference
  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {
      if (document.body.classList.contains("dark-mode")) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }


  const toggleSkillsBtn = document.getElementById("toggleSkills");
  const skillsSection = document.getElementById("skills");

  if (toggleSkillsBtn && skillsSection) {
    toggleSkillsBtn.addEventListener("click", function () {
      if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
      } else {
        skillsSection.style.display = "none";
      }
    });
  }


  const form = document.querySelector("form");

  function showError(input, message) {
    removeMessage(input);

    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;

    input.parentNode.appendChild(error);
  }

  function showSuccess(form, message) {
    const success = document.createElement("div");
    success.className = "success-message";
    success.textContent = message;

    form.appendChild(success);

    setTimeout(() => {
      success.remove();
    }, 3000);
  }

  function removeMessage(input) {
    const existing = input.parentNode.querySelector(".error-message");
    if (existing) {
      existing.remove();
    }
  }

  function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      let isValid = true;

      // Name validation
      if (name === "") {
        showError(nameInput, "Full name is required");
        isValid = false;
      } else {
        removeMessage(nameInput);
      }

      // Email validation
      if (!validateEmail(email)) {
        showError(emailInput, "Enter a valid email address");
        isValid = false;
      } else {
        removeMessage(emailInput);
      }

      // Message validation
      if (message.length < 10) {
        showError(messageInput, "Message must be at least 10 characters");
        isValid = false;
      } else {
        removeMessage(messageInput);
      }

      if (isValid) {
        showSuccess(form, "Message sent successfully!");
        form.reset();
      }
    });
  }

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

});