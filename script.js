let input = document.getElementById("inputBox");
let btn = document.getElementById("btnAdd");
let inCompleteTasks = document.getElementById("inComplete");
let completedTasks = document.getElementById("complete");
let removeBtn = document.getElementById("removeAll");
let tasksList = [];

if (localStorage.getItem("tasksList") !== null) {
  tasksList = JSON.parse(localStorage.getItem("tasksList"));
}

btn.onclick = addTask;
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

function addTask() {
  let taskName = input.value.trim();
  if (taskName !== "") {
    let task = {
      name: taskName,
      uniqueValue: tasksList.length + 1,
      status: false,
    };
    createAndAppendTask(task);
    tasksList.push(task);
    input.value = "";
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }
}

function saveToStorage(task) {
  let index = tasksList.findIndex((t) => t.uniqueValue === task.uniqueValue);
  if (index !== -1) {
    tasksList[index] = task;
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }
}

function deleteTask(task) {
  let index = tasksList.findIndex((t) => t.uniqueValue === task.uniqueValue);
  if (index !== -1) {
    tasksList.splice(index, 1);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }
}

function createAndAppendTask(task) {
  let taskId = "task" + task.uniqueValue;
  let checkboxId = "checkbox" + task.uniqueValue;
  let labelId = "label" + task.uniqueValue;
  let deleteId = "delete" + task.uniqueValue;

  let taskElement = document.createElement("li");
  taskElement.id = taskId;

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = checkboxId;

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.textContent = task.name;

  let deleteElement = document.createElement("button");
  deleteElement.textContent = "X";
  deleteElement.id = deleteId;

  taskElement.appendChild(checkBox);
  taskElement.appendChild(labelElement);
  taskElement.appendChild(deleteElement);

  if (task.status === true) {
    completedTasks.appendChild(taskElement);
    checkBox.checked = true;
  } else {
    inCompleteTasks.appendChild(taskElement);
  }

  checkBox.onclick = function () {
    if (task.status === true) {
      task.status = false;
      completedTasks.removeChild(taskElement);
      inCompleteTasks.appendChild(taskElement);
    } else {
      task.status = true;
      inCompleteTasks.removeChild(taskElement);
      completedTasks.appendChild(taskElement);
    }
    saveToStorage(task);
  };

  deleteElement.onclick = function () {
    taskElement.parentNode.removeChild(taskElement);
    deleteTask(task);
  };
}

removeBtn.onclick = function () {
  localStorage.clear();
  inCompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";
};

for (let x of tasksList) {
  createAndAppendTask(x);
}
