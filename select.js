const gender =document.querySelector('input[name="gender"]:checked').value;
const taskList = document.getElementById("taskList");

window.onload = function(){

    document.body.classList.add("boy-theme");

    loadTasks();
};
const genderRadios =
document.querySelectorAll('input[name="gender"]');

genderRadios.forEach(radio => {

    radio.addEventListener("change", () => {

        document.body.classList.remove(
            "boy-theme",
            "girl-theme"
        );

        document.body.classList.add(
            radio.value + "-theme"
        );

    });

});

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");

    if(taskInput.value === ""){
        alert("Enter Task");
        return;
    }

    const task = {
        text: taskInput.value,
        date: taskDate.value,
        completed: false
    };

    createTask(task);
    saveTask(task);

    taskInput.value = "";
    taskDate.value = "";
}

function createTask(task){

    const li = document.createElement("li");

    li.innerHTML = `
        <div>
            <strong>${task.text}</strong><br>
            <small>${task.date || "No Date"}</small>
        </div>

        <div class="actions">
            <button onclick="editTask(this)">✏</button>
            <button onclick="toggleTask(this)">✔</button>
            <button onclick="deleteTask(this)">🗑</button>
        </div>
    `;

    if(task.completed){
        li.classList.add("completed");
    }

    taskList.appendChild(li);
}

function toggleTask(btn){
    btn.parentElement.parentElement.classList.toggle("completed");
    updateStorage();
}
function editTask(btn){

    const li = btn.parentElement.parentElement;
    const taskText = li.querySelector("strong");

    const currentText = taskText.innerText;

    const input = document.createElement("input");

    input.type = "text";
    input.value = currentText;

    taskText.replaceWith(input);

    input.focus();

    input.addEventListener("blur", () => {

        const newStrong = document.createElement("strong");

        newStrong.innerText = input.value;

        input.replaceWith(newStrong);

        updateStorage();

    });

}

/*function editTask(btn){

    const li = btn.parentElement.parentElement;
    const taskText = li.querySelector("strong");

    const newTask = prompt("Edit Task", taskText.innerText);

    if(newTask){
        taskText.innerText = newTask;
        updateStorage();
    }
}*/

function deleteTask(btn){
    btn.parentElement.parentElement.remove();
    updateStorage();
}

function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage(){

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.querySelector("strong").innerText,
            date: li.querySelector("small").innerText,
            completed: li.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task);
    });
}