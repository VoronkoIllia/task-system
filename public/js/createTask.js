import { API_BASE_URL } from "./global/settings.js";

const createTaskForm = document.getElementById("createTaskForm");

createTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(createTaskForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Task created successfully!");
      createTaskForm.reset();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
