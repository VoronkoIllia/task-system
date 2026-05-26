import { API_BASE_URL } from "./global/settings.js";

const fieldErrors = {};

const nameInput = document.querySelector('input[name="name"]');
nameInput.addEventListener("blur", () => {
  const name = nameInput.value.trim();
  if (!name.length) {
    nameInput.classList.remove("valid");
    nameInput.classList.add("not-valid");
    nameInput.setCustomValidity("Name is required!");
    nameInput.nextElementSibling.textContent = "Name is required!";
    fieldErrors.name = "Name is required!";
  } else {
    nameInput.classList.remove("not-valid");
    nameInput.classList.add("valid");
    nameInput.setCustomValidity("");
    nameInput.nextElementSibling.textContent = "";
    delete fieldErrors.name;
  }
});
nameInput.addEventListener("input", () => {
  nameInput.classList.remove("not-valid");
  nameInput.classList.remove("valid");
  nameInput.nextElementSibling.textContent = "";
  delete fieldErrors.name;
});

const emailInput = document.querySelector('input[name="email"]');
emailInput.addEventListener("blur", () => {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailInput.classList.remove("valid");
    emailInput.classList.add("not-valid");
    emailInput.setCustomValidity("Please enter a valid email address!");
    emailInput.nextElementSibling.textContent =
      "Please enter a valid email address!";
    fieldErrors.email = "Please enter a valid email address!";
  } else {
    emailInput.classList.remove("not-valid");
    emailInput.classList.add("valid");
    emailInput.setCustomValidity("");
    emailInput.nextElementSibling.textContent = "";
    delete fieldErrors.email;
  }
});
emailInput.addEventListener("input", () => {
  emailInput.classList.remove("not-valid");
  emailInput.classList.remove("valid");
  emailInput.nextElementSibling.textContent = "";
  delete fieldErrors.email;
});

const passwordInput = document.querySelector('input[name="password"]');
passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value.length) {
    passwordInput.classList.remove("valid");
    passwordInput.classList.add("not-valid");
    passwordInput.setCustomValidity("Password is required!");
    passwordInput.nextElementSibling.textContent = "Password is required!";
    fieldErrors.password = "Password is required!";
  } else {
    passwordInput.classList.remove("not-valid");
    passwordInput.classList.add("valid");
    passwordInput.setCustomValidity("");
    passwordInput.nextElementSibling.textContent = "";
    delete fieldErrors.password;
  }
});
passwordInput.addEventListener("input", () => {
  passwordInput.classList.remove("not-valid");
  passwordInput.classList.remove("valid");
  passwordInput.nextElementSibling.textContent = "";
  delete fieldErrors.password;
});

const confirmPasswordInput = document.querySelector(
  'input[name="confirmPassword"]',
);

confirmPasswordInput.addEventListener("blur", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordInput.classList.remove("valid");
    confirmPasswordInput.classList.add("not-valid");
    confirmPasswordInput.nextElementSibling.textContent =
      "Passwords do not match!";
    confirmPasswordInput.setCustomValidity("Passwords do not match!");
    fieldErrors.confirmPassword = "Passwords do not match!";
  } else {
    confirmPasswordInput.classList.remove("not-valid");
    confirmPasswordInput.classList.add("valid");
    confirmPasswordInput.setCustomValidity("");
    confirmPasswordInput.nextElementSibling.textContent = "";
    delete fieldErrors.confirmPassword;
  }
});
confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordInput.classList.remove("not-valid");
  confirmPasswordInput.classList.remove("valid");
  confirmPasswordInput.nextElementSibling.textContent = "";
  delete fieldErrors.confirmPassword;
});

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const { name, email, password, confirmPassword } = Object.fromEntries(
    formData.entries(),
  );

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert("Registration successful!");
      registerForm.reset();
    } else {
      const errorData = await response.json().then((res) => res.errors);

      for (const key in errorData) {
        const input = registerForm.querySelector(`input[name="${key}"]`);
        input.classList.remove("valid");
        input.classList.add("not-valid");
        input.setCustomValidity(errorData[key]);
        input.nextElementSibling.textContent = errorData[key];
        fieldErrors[key] = errorData[key];
      }
      document.querySelector('button[type="submit"]').disabled = true;
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

document
  .querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"]',
  )
  .forEach((input) => {
    input.addEventListener("input", () => {
      const button = registerForm.querySelector('button[type="submit"]');
      if (Object.keys(fieldErrors).length === 0) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
    input.addEventListener("blur", () => {
      const button = registerForm.querySelector('button[type="submit"]');
      if (Object.keys(fieldErrors).length === 0) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  });
