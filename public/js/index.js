import { API_BASE_URL } from "./global/settings.js";

const logoutBtn = document.getElementById("logoutBtn");
const tasksContainer = document.getElementById("tasksContainer");

logoutBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      alert("Logout successful!");
      window.location.href = "login.html";
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      displayTasks(result.data);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

function displayTasks(tasks) {
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Status: ${task.status}</p>
            <p>Priority: ${task.priority}</p>
            <p>Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
            <a href="task.html?taskId=${task._id}">View Details</a>
          `;
    tasksContainer.appendChild(taskDiv);
  });
}

fetchTasks();
