var picker = datepicker("due-date");
picker.setMin(new Date());
var ToDoTask = (function () {
    function ToDoTask() {
    }
    return ToDoTask;
}());
window.onload = function () {
    var addTask = document.getElementById("add");
    addTask.onclick = main;
};
function main() {
    if (isValid()) {
        var task = getToDoTask();
        displayToDoTask(task);
    }
}
function isValid() {
    var titleBox = document.getElementById("name");
    var titleInput = titleBox.value;
    if (titleInput == "") {
        titleBox.nextElementSibling.innerHTML =
            "Please enter a title";
        return false;
    }
    if (titleInput != "") {
        titleBox.nextElementSibling.innerHTML = "";
        return true;
    }
}
function displayToDoTask(task) {
    var itemText = document.createElement("h3");
    itemText.innerText = task.name;
    var itemDate = document.createElement("p");
    itemDate.innerText = task.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (task.isComplete) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (task.isComplete) {
        var completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}
function getInput(id) {
    return document.getElementById(id);
}
function getToDoTask() {
    var myTask = new ToDoTask();
    var nameInput = getInput("task");
    myTask.name = nameInput.value;
    var dueDateInput = getInput("due-date");
    myTask.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInput("is-complete");
    myTask.isComplete = isCompleted.checked;
    return myTask;
}
