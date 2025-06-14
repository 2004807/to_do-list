let tasks = [];

// Pure function: Add new task
const createTask = (tasks, title, description) => {
  return [...tasks, {
    id: Date.now(),
    title,
    description,
    completed: false
  }];
};

// Pure function: Delete task
const removeTask = (tasks, id) => tasks.filter(task => task.id !== id);

// Pure function: Edit task
const updateTask = (tasks, id, newTitle, newDesc) =>
  tasks.map(task =>
    task.id === id
      ? { ...task, title: newTitle ?? task.title, description: newDesc ?? task.description }
      : task
  );

// Recursive rendering
const renderTasks = (tasks, container, index = 0) => {
  if (index >= tasks.length) return;

  const task = tasks[index];
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${task.title}</strong> - ${task.description}
    <button data-id="${task.id}" class="edit">Edit</button>
    <button data-id="${task.id}" class="delete">Delete</button>
  `;
  container.appendChild(li);

  renderTasks(tasks, container, index + 1);
};

// UI update wrapper
const updateUI = (newTasks) => {
  tasks = newTasks;
  const list = document.getElementById("taskList");
  list.innerHTML = '';
  renderTasks(tasks, list);
};

// Handle Add Button
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDescription").value.trim();
  if (!title) return alert("Please enter a title!");

  const newTasks = createTask(tasks, title, desc);
  updateUI(newTasks);

  document.getElementById("taskTitle").value = '';
  document.getElementById("taskDescription").value = '';
});

// Handle Edit/Delete Buttons (Event Delegation)
document.getElementById("taskList").addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("delete")) {
    const newTasks = removeTask(tasks, id);
    updateUI(newTasks);
  } else if (e.target.classList.contains("edit")) {
    const task = tasks.find(t => t.id === id);
    const newTitle = prompt("Edit title:", task.title);
    const newDesc = prompt("Edit description:", task.description);
    const newTasks = updateTask(tasks, id, newTitle, newDesc);
    updateUI(newTasks);
  }
});
