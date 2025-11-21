// index.js
// Author: Juuso Herlevi
// Date: 2025-11-14
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const timestampField = document.getElementById("timestamp");

  // Utility function: current timestamp
  const getTimestamp = () => new Date().toLocaleString();

  // Validation function
  const validateForm = () => {
    let valid = true;

    // Reset all error messages
    document.querySelectorAll(".error-message").forEach(e => e.textContent = "");

    // Name validation
    const fullName = document.getElementById("fullName").value.trim();
    if (!/^[A-Za-zÅÄÖåäö]{2,}\s+[A-Za-zÅÄÖåäö]{2,}/.test(fullName)) {
      document.getElementById("nameError").textContent = "Please enter your full name.";
      valid = false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Phone validation
    const phone = document.getElementById("phone").value.trim();
    if (!/^(\+358|0)\d{6,11}$/.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Please enter a valid phone number (e.g. +358401234567).";
      valid = false;
    }

    // Birth date validation
    const birthDate = document.getElementById("birthDate").value;
    if (!birthDate) {
      document.getElementById("birthError").textContent = "Please enter your birth date.";
      valid = false;
    } else {
      const birth = new Date(birthDate);
      const now = new Date();
      const age = now.getFullYear() - birth.getFullYear();
      if (birth > now || age < 13) {
        document.getElementById("birthError").textContent =
          "Please enter a valid birth date (you must be at least 13 years old).";
        valid = false;
      }
    }

    // Terms validation
    const terms = document.getElementById("terms").checked;
    if (!terms) {
      document.getElementById("termsError").textContent = "You must accept the terms to continue.";
      valid = false;
    }

    return valid;
  };

  // Submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    timestampField.value = getTimestamp();

    if (!validateForm()) return;

    // Create table row
    const row = document.createElement("tr");
    const fields = [
      timestampField.value,
      form.fullName.value.trim(),
      form.email.value.trim(),
      form.phone.value.trim(),
      form.birthDate.value
    ];

    fields.forEach(text => {
      const td = document.createElement("td");
      td.textContent = text;
      row.appendChild(td);
    });

    tableBody.appendChild(row);
    form.reset();
  });
});