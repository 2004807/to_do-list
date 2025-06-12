let tasks = [] ;

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title === "") return alert("Please enter a title!");

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
    };
    tasks.push(newTask);
    displayTasks();
    clearInputs();
     }

     function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();    
 }

    function editTask(id) {
        const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.description);

  if (newTitle !== null) task.title = newTitle;
  if (newDesc !== null) task.description = newDesc;

  displayTasks();
    }

    function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.description}
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
   ` ;
    list.appendChild(li);
  });
}

function clearInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
}