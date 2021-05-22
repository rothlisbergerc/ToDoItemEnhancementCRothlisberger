// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("due-date");
picker.setMin(new Date()); // Today's date

class ToDoTask{
    name:string;
    dueDate:Date;
    isComplete:boolean;
}

window.onload = function(){
    let addTask = document.getElementById("add");
    addTask.onclick = main;
}

function main(){
    if(isValid()){
        let task = getToDoTask();
        displayToDoTask(task);
    }
}

/**
 * Checks if textbox input is valid.
 */
function isValid(){
    let titleBox:HTMLInputElement = 
        <HTMLInputElement>document.getElementById("name");
    let titleInput:string = titleBox.value; 

    if(titleInput == ""){        
        titleBox.nextElementSibling.innerHTML = 
            "Please enter a title";
        return false;
    }

    if(titleInput != ""){        
        titleBox.nextElementSibling.innerHTML = "";
        return true;
    }
}

/**
 * Display given ToDoItem on the web page
 */
 function displayToDoTask(task:ToDoTask):void{
    // ex. <h3>Record JS Lecture</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = task.name;

    // ex. <p>June 1st 2020</p>
    let itemDate = document.createElement("p");
    itemDate.innerText = task.dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if(task.isComplete){
        itemDiv.classList.add("completed");
    }
    
    /*  <div class="completed">
            <h3>Record JS Lecture</h3>
            <p>June 1st 2020</p>
        </div>
    */
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(task.isComplete){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

function getInput(id){
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Get all user input off form and wrap in a ToDoTask object
 */
function getToDoTask():ToDoTask{
    let myTask = new ToDoTask();

    // get name
    let nameInput = getInput("task");
    myTask.name = nameInput.value;

    // get due date
    let dueDateInput = getInput("due-date");
    myTask.dueDate =  new Date(dueDateInput.value);

    // get isCompleted
    let isCompleted  = getInput("is-complete")    ;
    myTask.isComplete = isCompleted.checked;

    return myTask;
}