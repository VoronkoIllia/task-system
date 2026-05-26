import { API_BASE_URL } from "./global/settings.js";

let hasCommentContentError = false;

async function loadTaskDetails() {
  const taskId = new URLSearchParams(window.location.search).get("taskId");
  if (!taskId) {
    alert("No task ID provided.");
    return;
  }

  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
  if (!response.ok) {
    alert("Failed to load task details.");
    return;
  }

  const task = await response.json().then((res) => {
    if (res.error) {
      alert(res.error);
      return null;
    }
    return res.data;
  });

  if (!task) return;

  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description;
  document.getElementById("taskAuthor").textContent = task.author;
  document.getElementById("taskDueDate").textContent = task.dueDate;
  document.getElementById("taskStatus").textContent = task.status;
  document.getElementById("taskPriority").textContent = task.priority;

  await loadCommentsForTask(taskId);
}

async function loadCommentsForTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/comments`);
  if (!response.ok) {
    alert("Failed to load comments.");
    return;
  }

  const comments = await response.json().then((res) => res.data);
  renderComments(comments);
}

function renderComments(comments) {
  const commentsContainer = document.getElementById("comments-list");
  commentsContainer.innerHTML = ""; // Clear existing comments

  const commentsHTML = comments.map(getCommentHTML).join("");
  commentsContainer.innerHTML = commentsHTML;
}

function getCommentHTML(comment) {
  return `
    <div class="comment">
      <p>${comment.content}</p>
      <small>By ${comment.author.name} on ${new Date(comment.createdAt).toLocaleString()}</small>
    </div>
  `;
}

const commentContentInput = document.querySelector("input[name='content']");
commentContentInput.addEventListener("blur", () => {
  const content = commentContentInput.value;
  if (!content.trim()) {
    commentContentInput.classList.remove("valid");
    commentContentInput.classList.add("not-valid");
    commentContentInput.nextElementSibling.textContent =
      "Comment content cannot be empty.";
    hasCommentContentError = true;
  } else {
    commentContentInput.classList.remove("not-valid");
    commentContentInput.classList.add("valid");
    commentContentInput.nextElementSibling.textContent = "";
    hasCommentContentError = false;
  }

  const submitButton = document.querySelector(
    "#addCommentForm button[type='submit']",
  );
  submitButton.disabled = hasCommentContentError;
});
commentContentInput.addEventListener("input", () => {
  commentContentInput.nextElementSibling.textContent = "";
  hasCommentContentError = false;

  commentContentInput.classList.remove("not-valid");
  commentContentInput.classList.remove("valid");

  const submitButton = document.querySelector(
    "#addCommentForm button[type='submit']",
  );
  submitButton.disabled = hasCommentContentError;
});

const commentForm = document.getElementById("addCommentForm");
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const contentTextarea = document.querySelector("input[name='content']");
  const taskId = new URLSearchParams(window.location.search).get("taskId");

  const content = contentTextarea.value.trim();

  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const errorData = await response.json().then((res) => res.errors);
    contentTextarea.nextElementSibling.textContent = errorData["content"];

    contentTextarea.classList.remove("valid");
    contentTextarea.classList.add("not-valid");

    const submitButton = document.querySelector(
      "#addCommentForm button[type='submit']",
    );
    submitButton.disabled = true;
    return;
  }

  // Clear the comment form
  contentTextarea.value = "";

  // Reload comments
  await loadCommentsForTask(taskId);
});
loadTaskDetails();
